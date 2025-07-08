import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import toast from "react-hot-toast";
import { sendAdminNotification, sendEmail } from "@/actions/sendEmail";

export const createFormSubmission = createAsyncThunk(
  "form/createSubmission",
  async ({ payload, onSuccess }, thunkAPI) => {
    try {
      const requestsCollectionRef = collection(db, "requests");
      // Step 1: Check if the email already exists in the 'requests' collection
      // const emailQuery = query(
      //   requestsCollectionRef,
      //   where("email", "==", payload.email)
      // );
      // const querySnapshot = await getDocs(emailQuery);

      // if (!querySnapshot.empty) {
      //   toast.error("You have already sent a request with this email.");
      //   return thunkAPI.rejectWithValue("Email already exists");
      // }
      // Step 2: If email does not exist, create the form submission
      const formData = {
        ...payload,
        createdAt: serverTimestamp(),
        status: "pending",
      };

      const docRef = await addDoc(requestsCollectionRef, formData);

      await sendEmail(payload.email);
      await sendAdminNotification(payload);
      onSuccess();
      toast.success("Form submitted successfully!");
      return {
        id: docRef.id,
        createdAt: "just now",
        ...formData,
      };
    } catch (error) {
      console.error("Form Submission Error:", error);
      toast.error("Failed to submit form");
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);
