
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import admin from "firebase-admin";
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  const serviceAccount = require("../../../config/servicefile.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// g
// g

const db = getFirestore();
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
// const webhookSecret = 'whsec_j29IQhBRZ8tOgoGxrb3NdlKSqeiRmrjZ';
const webhookSecret = 'whsec_8YExNcm6pDMZc8EYcvT3mQM6YXBQM8SV'; 
// const webhookSecret = 'whsec_inBZ4j7hUcgdPsDjQ1c71vBJS34i37zL';
export async function POST(req) {
  try {
    const body = await req.text();
    const headersList = headers();
    const signature = headersList.get('stripe-signature');

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error(`⚠️  Webhook signature verification failed.`, err.message);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    // Handle different event types
    switch (event.type) {

      case 'checkout.session.completed':
        const checkoutSession = event.data.object;
        console.log(checkoutSession.metadata, "checkoutSession");

        if (checkoutSession.mode === 'subscription') {


          // Handle subscription payment
          const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription);
          const productId = subscription.items.data[0].price.product;
          const product = await stripe.products.retrieve(productId);
          console.log("product",product)
          console.log("subscription",subscription)

          await updateUserPayment({
            userId:checkoutSession.metadata.userId,
            subscriptionId: subscription.id,
            customerId: checkoutSession.customer,
            productId: productId,
            status: 'completed',
            productName: product.name,
            type: 'subscription',
            amount: checkoutSession.amount_total,
            service:checkoutSession.metadata.service,
            validUntil:product.name =="Per Week" ? calculateValidityPeriod(product.metadata.validity_days):new Date()
          });
        } else if (checkoutSession.mode === 'payment') {
          // Handle one-time payment
          const lineItems = await stripe.checkout.sessions.listLineItems(checkoutSession.id);
          const productId = lineItems.data[0].price.product;
          const product = await stripe.products.retrieve(productId);
          console.log("product", product)
          console.log("checkoutSession==>", checkoutSession)
          await updateUserPayment({
            userId: checkoutSession.metadata.userId,
            paymentId: checkoutSession.payment_intent,
            productId: productId,
            customerId: checkoutSession.customer,
            status: 'completed',
            productName: product.name,
            type: 'one-time',
            amount: checkoutSession.amount_total,
            service: checkoutSession.metadata.service,
        
          });
        }
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await updateUserPayment({
          userId:checkoutSession.metadata.userId,
          paymentId: paymentIntent.id,
          status: 'completed',
        });
        break;

      case 'payment_intent.failed':
        const failedPaymentIntent = event.data.object;
        await updateUserPayment({
          userId:checkoutSession.metadata.userId,
          paymentId: failedPaymentIntent.id,
          status: 'failed',
        });
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        await updateUserPayment({
          userId:checkoutSession.metadata.userId,
          subscriptionId: failedInvoice.subscription,
          status: 'past_due',
        });
        break;

      case 'customer.subscription.deleted':
        const canceledSubscription = event.data.object;
        await updateUserPayment({
          userId:checkoutSession.metadata.userId,
          subscriptionId: canceledSubscription.id,
          status: 'canceled',
        });
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object;
        console.log("updatedSubscription",updatedSubscription)

        await updateUserPayment({
          userId:checkoutSession.metadata.userId,
          subscriptionId: updatedSubscription.id,
          status: updatedSubscription.status, // Will be 'unpaid' after failed retries
        });

        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {

    console.log("err",err)
   
    return NextResponse.json(

      { error: err },
      { status: 500 }
    );
  }
}

// Helper function to calculate validity period
function calculateValidityPeriod(days) {
  if (!days) return null;
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + parseInt(days));
  return validUntil;
}

async function updateUserPayment(paymentData) {
  console.log("paymentData==>", paymentData);

  if (!paymentData.userId && paymentData.type !== 'subscription-update') {
    throw new Error('userId is required for payment updates');
  }

  try {
    // Determine collection based on service
    let collectionName;
    switch (paymentData.service) {
      case "Email Receipt Generator":
        collectionName = 'receipts';
        break;
      case "Emulator":
        collectionName = 'emulators';
        break;
      case "Papers":
        collectionName = 'papers';
        break;
      default:
        collectionName = 'users';
    }
    const userRef = db.collection(collectionName).doc(paymentData.userId);
    
    // Base update data
    const updateData = {
      subscriptionStatus: paymentData.status,
      paymentType: paymentData.type,
      productName: paymentData.productName,
      service: paymentData.service,
      customerId: paymentData.customerId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // Handle different payment types
    if (paymentData.type === 'subscription') {
      updateData.subscriptionId = paymentData.subscriptionId;
      if (paymentData.status === 'completed') {
        updateData.validUntil = admin.firestore.Timestamp.fromDate(
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        );
      } else if (['canceled', 'past_due', 'unpaid'].includes(paymentData.status)) {
        updateData.validUntil = admin.firestore.Timestamp.fromDate(new Date());
      }
    } else if (paymentData.type === 'one-time') {
      updateData.paymentId = paymentData.paymentId;
      updateData.amount = paymentData.amount;
      if (paymentData.validUntil) {
        updateData.validUntil = admin.firestore.Timestamp.fromDate(paymentData.validUntil);
      }
    }

    // Replace update() with set() and merge option
    await userRef.set(updateData, { merge: true });

    // Create payment history record with service information
    const paymentRecord = {
      userId: paymentData.userId,
      service: paymentData.service,
      collection: collectionName,
      ...updateData,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('payments').add(paymentRecord);

  } catch (error) {
    console.error('Error updating user payment:', error);
    throw new Error(`Failed to update payment: ${error.message}`);
  }
}

