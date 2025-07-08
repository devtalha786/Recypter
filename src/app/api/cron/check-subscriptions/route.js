
import { NextResponse } from 'next/server';
import admin from "firebase-admin"
import { getFirestore } from 'firebase-admin/firestore';
if (!admin.apps.length) {
  const serviceAccount = require("../../../../config/servicefile.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),

  });
}

const db = getFirestore();

export async function POST(request) {
  try {
    console.log('Running subscription check...');

    // Get current timestamp
    const now = new Date();

    // Query expired subscriptions
    const receiptsRef = db.collection('receipts');
    const expiredSubscriptions = await receiptsRef
      .where('validUntil', '<', now)
      .where('subscriptionStatus', '!=', 'cancelled')
      .get();

    console.log(`Found ${expiredSubscriptions.size} expired subscriptions`);

    if (expiredSubscriptions.empty) {
      return NextResponse.json({
        message: 'No expired subscriptions found',
        timestamp: now.toISOString(),
      });
    }

    // Batch update expired subscriptions
    const batch = db.batch();
    expiredSubscriptions.forEach((doc) => {
      batch.update(doc.ref, {
        subscriptionStatus: 'cancelled',
        updatedAt: now,
      });
    });

    await batch.commit();

    return NextResponse.json({
      message: `Successfully updated ${expiredSubscriptions.size} expired subscriptions`,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error('Error in subscription check:', error.stack);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}