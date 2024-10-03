// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { doc, updateDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Firestore 초기화
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function updateIsClickedInFirebase(id: string, isClicked: number) {
  try {
    const itemRef = doc(db, "flawdb", id);
    await updateDoc(itemRef, { 
      isClicked: isClicked, 
    });
    console.log(`Updated isPinned for item with id ${id}`);
  } catch (error) {
    console.error("Error updating isPinned in Firebase:", error);
  }
}

export async function updateIsPinnedInFirebase(id: string, isPinned: boolean) {
  try {
    const itemRef = doc(db, "flawdb", id);
    await updateDoc(itemRef, { isPinned });
    console.log(`Updated isPinned for item with id ${id}`);
  } catch (error) {
    console.error("Error updating isPinned in Firebase:", error);
  }
}