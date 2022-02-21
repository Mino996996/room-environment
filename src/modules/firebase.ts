import { initializeApp } from "firebase/app";
//Firebase ver9 compliant
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
//Firebase ver9 compliant
export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);
