import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import admin from "firebase-admin"
import { getFirestore } from 'firebase-admin/firestore';


if (!admin.apps.length) {
  const serviceAccount = require("../../../config/servicefile.json")
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),

  });
}

const db = getFirestore();

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { plan, userId,email } = await request.json();
    console.log(plan, "=============================plan");

    // Define price IDs for each subscription plan
    // const priceIds = {
    //   'Per Receipt': 'price_1QTjTAFLeaScpKayYPjCIBxL',
    //    // Replace with your Stripe Price ID for $1.99 per receipt
    //   'Per Day': 'price_1QTjZuFLeaScpKaywZTwMara',     // Replace with your Stripe Price ID for $10 per day
    //   'Per Week': 'price_1QTjbLFLeaScpKayXe4RPfBT',
    //       // Replace with your Stripe Price ID for $20 per week
    //   'For Lifetime': 'price_1QTjcVFLeaScpKaylpEIBpTZ', // Replace with your Stripe Price ID for $30 lifetime
    //   'For LifeTime': 'price_1QUv5hFLeaScpKay900G9lx0',
    // };

    // for live
    const priceIds = {
      'Per Receipt': 'price_1QYPttF2IdP3Y9s6GfEQb3Di',
       // Replace with your Stripe Price ID for $1.99 per receipt
      'Per Day': 'price_1QYPxYF2IdP3Y9s6LYubXCJW',     // Replace with your Stripe Price ID for $10 per day
      'Per Week': 'price_1QYQ1RF2IdP3Y9s6Fy72OjYj',
          // Replace with your Stripe Price ID for $20 per week
      'For Lifetime': 'price_1QYQ3WF2IdP3Y9s6aLz44RJU', // Replace with your Stripe Price ID for $30 lifetime
      'For LifeTime Emulator': 'price_1QYQ6iF2IdP3Y9s6qf046STW',
      'For LifeTime Papers': 'price_1QYQBtF2IdP3Y9s667y5Gx0I',

    };

    // for test

    //     const priceIds = {
    //   'Per Receipt': 'price_1QYQOeF2IdP3Y9s6wRFsSdE2',
    //    // Replace with your Stripe Price ID for $1.99 per receiptp
    //   'Per Day': 'price_1QYQPDF2IdP3Y9s6ShBaX8n4',     // Replace with your Stripe Price ID for $10 per day
    //   'Per Week': 'price_1QYQPjF2IdP3Y9s6oc41R1kb',
    //       // Replace with your Stripe Price ID for $20 per week
    //   'For Lifetime': 'price_1QYQQ3F2IdP3Y9s6mhswqBGv', // Replace with your Stripe Price ID for $30 lifetime
    //   'For LifeTime Emulator': 'price_1QYQQOF2IdP3Y9s6BdH8Dd4P',
    //   'For LifeTime Papers': 'price_1QYQRXF2IdP3Y9s6YNG2Tpi5',

    // };
    if (plan.service == "Email Receipt Generator") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceIds[plan.type], // Use the corresponding price ID
            quantity: 1,
          },
        ],
        customer_email:email,
        metadata: {
          service: plan.service,
          userId: userId,
         
        

        },
        mode: plan.type === 'For Lifetime' || plan.type === 'Per Receipt' ? 'payment' : 'subscription', // Per Receipt

        success_url: `${process.env.NEXT_PUBLIC_URL}/receipts`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/home`,
      });
      return NextResponse.json({ id: session.id });
    } else if (plan.service == "Emulator") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email:email,
        line_items: [
          {
            price: priceIds[plan.type], // Use the corresponding price ID
            quantity: 1,
          },
        ],
        metadata: {
          service: plan.service,
          userId: userId
        },
        mode:'payment', // Per Receipt

        success_url: `${process.env.NEXT_PUBLIC_URL}/emulators`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/home`,
      });
      return NextResponse.json({ id: session.id });
    }else if(plan.service=="Papers"){
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email:email,
        line_items: [
          {
            price: priceIds[plan.type], // Use the corresponding price ID
            quantity: 1,
          },
        ],
        metadata: {
          service: plan.service,
          userId: userId
        },
        mode:'payment', // Per Receipt
       
        success_url: `${process.env.NEXT_PUBLIC_URL}/papers`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/home`,
      });
      return NextResponse.json({ id: session.id });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}