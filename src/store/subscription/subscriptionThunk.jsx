import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/config/firebase";
import { collection, query, where, getDocs, doc, getDoc, updateDoc, orderBy, limit, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

export const getReceipts = createAsyncThunk(
  "subscription/getReceipts",
  async (userId, thunkAPI) => {
    try {
      // Create a direct reference to the user's receipt document
      // userId is the user's id    
      console.log(userId,"userId");

      const receiptDoc = doc(db, "receipts", userId);
      
      // Get the document
      const docSnap = await getDoc(receiptDoc);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Get Receipts Error:", error);
      toast.error(error.message || "Failed to fetch receipts");
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
); 


export const getPapers = createAsyncThunk(
    "subscription/getPapers",
    async (userId, thunkAPI) => {
      try {
        // Create a direct reference to the user's receipt document
        // userId is the user's id    
        console.log(userId,"userId");
  
        const papersDoc = doc(db, "papers", userId);
        
        // Get the document
        const docSnap = await getDoc(papersDoc);
        
        if (docSnap.exists()) {
          return {
            id: docSnap.id,
            ...docSnap.data()
          };
        } else {
          return null;
        }
      } catch (error) {
        console.error("Get Papers Error:", error);
    toast.error(error.message || "Failed to fetch papers");
        return thunkAPI.rejectWithValue(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
    }
  );    
  
  // Emulators

  export const getEmulators = createAsyncThunk(
    "subscription/getEmulators",
    async (userId, thunkAPI) => {
      try {
        // Create a direct reference to the user's receipt document
        // userId is the user's id    
        console.log(userId,"userId");
  
        const emulatorsDoc = doc(db, "emulators", userId);
        
        // Get the document
        const docSnap = await getDoc(emulatorsDoc);
        
        if (docSnap.exists()) {
          return {
            id: docSnap.id,
            ...docSnap.data()
          };
        } else {
          return null;
        }
      } catch (error) {
        console.error("Get Emulators Error:", error);
        toast.error(error.message || "Failed to fetch emulators");
        return thunkAPI.rejectWithValue(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
        }
  ); 

export const updateReceipts = createAsyncThunk(
  "subscription/updateReceipts",
  async ({userId,onSuccess}, thunkAPI) => {
    try {
      const receiptDoc = doc(db, "receipts", userId); // Reference to the user's receipt document
      
      // Update the subscriptionStatus to inactive
      await updateDoc(receiptDoc, {
        subscriptionStatus: "inactive"
      });
      onSuccess()

      return { userId, subscriptionStatus: "inactive" }; // Return updated status
    } catch (error) {
      console.error("Update Receipts Error:", error);
      toast.error(error.message || "Failed to update receipts");
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);




// New function to track receipt creation
export const createReceiptTracking = createAsyncThunk(
  "subscription/createReceiptTracking",
  async (userId, thunkAPI) => {
    try {
      const receiptTrackingRef = collection(db, "receiptTracking");
      
      const trackingData = {
        userId,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(receiptTrackingRef, trackingData);
      
      return {
        id: docRef.id,
        ...trackingData,
        createdAt: new Date().toISOString() // For immediate use in the frontend
      };
    } catch (error) {
      console.error("Create Receipt Tracking Error:", error);
      toast.error(error.message || "Failed to track receipt creation");
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

// New function to get latest receipt creation
export const getLatestReceiptCreation = createAsyncThunk(
  "subscription/getLatestReceiptCreation",
  async (userId, thunkAPI) => {
    try {
      const receiptTrackingRef = collection(db, "receiptTracking");
      
      const q = query(
        receiptTrackingRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate().toISOString() // Convert Firestore Timestamp to ISO string
        };
      }
      
      return null;
    } catch (error) {
      console.error("Get Latest Receipt Creation Error:", error);
      toast.error(error.message || "Failed to get receipt creation time");
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

// Helper function to check if receipt creation is allowed
export const checkReceiptCreation = (latestCreation) => {
  if (!latestCreation || !latestCreation.createdAt) {
    return { canCreate: true, timeRemaining: 0 };
  }

  const creationTime = new Date(latestCreation.createdAt).getTime();
  const currentTime = new Date().getTime();
  const hourInMs = 60 * 60 * 1000;
  const timeDiff = currentTime - creationTime;

  if (timeDiff >= hourInMs) {
    return { canCreate: true, timeRemaining: 0 };
  }

  const timeRemaining = hourInMs - timeDiff;
  const minutesRemaining = Math.ceil(timeRemaining / (60 * 1000));
  
  return { 
    canCreate: false, 
    timeRemaining: minutesRemaining 
  };
};


// Keep your existing getPapers and getEmulators functions...