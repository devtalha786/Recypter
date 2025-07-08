import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db, storage } from "@/config/firebase";
import { v4 as uuidv4 } from 'uuid';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp, getDocs, collection, where, query, updateDoc, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Helper function to format user data
const formatUserData = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  status:"Open",
  lastLoginAt: serverTimestamp(),
});

// Helper function to save user to Firestore
const saveUserToFirestore = async (userData) => {
  const userRef = doc(db, "users", userData.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // New user - create full profile
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      role: 'user',
    });
  } else {
    // Existing user - update last login
    await setDoc(userRef, {
      lastLoginAt: serverTimestamp(),
    }, { merge: true });
  }

  const updatedUserSnap = await getDoc(userRef);
  const updatedUserData = updatedUserSnap.data();
  console.log("Updated user data:", updatedUserData);
  return updatedUserData;
};

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, thunkAPI) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userData = formatUserData(result.user);

      let data = await saveUserToFirestore(userData);
      console.log("data------", data)
      toast.success("Successfully logged in with Google!");

      return data;
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error(error.message || "Failed to login with Google");
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

export const loginWithDiscord = createAsyncThunk(
  "auth/loginWithDiscord",
  async ({ userId, onSuccess, onError }, thunkAPI) => {
    try {
      // Get user data from Firestore
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        throw new Error("User not found");
      }

      const userData = userSnap.data();

      onSuccess();

      return userData;
    } catch (error) {
      console.error("Discord Login Error:", error);

      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

export const uploadImage = createAsyncThunk(
  "auth/uploadImage",
  async ({ file, onSuccess }, thunkAPI) => {
    try {
      if (!file) throw new Error("No file provided");

      // Create a unique file name
      const fileName = `${Date.now()}-${file.name}`;

      // Create a reference to the file location in Firebase Storage
      const storageRef = ref(storage, `images/${fileName}`);

      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      onSuccess(downloadURL)

      // toast.success("Image uploaded successfully!");

      return downloadURL;
    } catch (error) {
      console.error("Image Upload Error:", error);
      toast.error(error.message || "Failed to upload image");
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);
// Improved version
export const addUser = createAsyncThunk(
  "auth/addUser",
  async ({ email, receiptType,subscription, onSuccess }, thunkAPI) => {
   
    try {
      console.log("Searching for email:", email);

      // Query users collection where email field matches
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Email does not exist");
      }

      // Get the first matching document
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      // Update the document using its ID
      const userDocRef = doc(db, "users", userDoc.id);
      await updateDoc(userDocRef, {
        ...userData,
        status:subscription=="Free" ? "Free" : "Open",
      });
      if(subscription !="Free"){
        await updateUserPayment({
          userId: userDoc.id,
          // random id
          paymentId: uuidv4(),
          productId: uuidv4,
          customerId: null,
          status: 'completed',
          subscription,
          productName: subscription || 'Lifetime',
          type:subscription =='Lifetime' || subscription == 'Per Receipt' ? 'one-time' : 'subscription'  ,
          service: receiptType,
          
      
        });
      }
     


      toast.success("Save Successfully!");
      onSuccess();
      return { ...userData, id: userDoc.id };
    } catch (error) {
      console.error("Update User Error:", error);
      toast.error(error.message || "Failed to update user");
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);







async function updateUserPayment(paymentData) {
  console.log("paymentData==>", paymentData);

 

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
    
    // Base update data
    const updateData = {
      subscriptionStatus: paymentData.status,
      paymentType: paymentData.type,
      productName: paymentData.productName,
      service: paymentData.service,
      customerId: paymentData.customerId,
      updatedAt: serverTimestamp()
    };

    // Handle different payment types
    if (paymentData.type == 'subscription') {
      updateData.subscriptionId = paymentData?.subscriptionId || uuidv4();
      if (paymentData.status === 'completed') {
        // Set validUntil based on subscription type
        const validUntil = new Date();
        if (paymentData.subscription === 'Per Day') {
          validUntil.setDate(validUntil.getDate() + 1); // Add 1 day
        } else {
          validUntil.setDate(validUntil.getDate() + 7); // Add 7 days
        }
        updateData.validUntil = validUntil;
      }
    } else if (paymentData.type === 'one-time') {
      updateData.paymentId = paymentData.paymentId;
      // updateData.amount = paymentData.amount;
      if (paymentData.validUntil) {
        updateData.validUntil = paymentData.validUntil;
      }
    }
    // Update user document using new Firebase syntax
    const userRef = doc(db, collectionName, paymentData.userId);
    await setDoc(userRef, updateData, { merge: true });
  } catch (error) {
    console.error('Error updating user payment:', error);
    throw new Error(`Failed to update payment: ${error.message}`);
  }
}