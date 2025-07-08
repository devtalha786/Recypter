import { db } from "@/config/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import toast from "react-hot-toast";

const formatData = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
    ...data,
  };
};

export const fetchAudio = createAsyncThunk(
  "audio/fetchAudio",
  async (_, thunkAPI) => {
    try {
      const audioCollectionRef = collection(db, "audio");
      const audioQuery = query(
        audioCollectionRef,
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(audioQuery);
      const audioTracks = querySnapshot.docs.map(formatData);

      return audioTracks;
    } catch (error) {
      console.error("Fetch Audio Error:", error);
      toast.error("Failed to fetch audio tracks");
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);




// Thunk to fetch video data
// export const fetchVideos = createAsyncThunk(
//   "videos/fetchVideos",
//   async (_, thunkAPI) => {
//     try {
//       const videoCollectionRef = collection(db, "videos"); // Reference to the video collection
//       const videoQuery = query(
//         videoCollectionRef,
//       );

//       const querySnapshot = await getDocs(videoQuery); // Fetch documents from the video collection
//       const videoTracks = querySnapshot.docs.map(formatData); // Format each video document

//       return videoTracks; // Return the formatted video tracks
//     } catch (error) {
//       console.error("Fetch Video Error:", error);
//       toast.error("Failed to fetch video tracks"); // Show an error toast if something goes wrong
//       return thunkAPI.rejectWithValue(
//         error instanceof Error ? error.message : "An error occurred"
//       );
//     }
//   }
// );

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async (_, thunkAPI) => {
    try {
      // Reference to the video collection
      const videoCollectionRef = collection(db, "videos");
      
      // Query for the single most recent video
      const videoQuery = query(
        videoCollectionRef,
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(videoQuery);
      
      // If no videos found, return empty array
      if (querySnapshot.empty) {
        return [];
      }

      // Just map the single document
      const videoTrack = formatData(querySnapshot.docs[0]);
      
      // Return as array to maintain consistency with existing state structure
      return [videoTrack];
      
    } catch (error) {
      console.error("Fetch Video Error:", error);
      toast.error("Failed to fetch video");
      
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);