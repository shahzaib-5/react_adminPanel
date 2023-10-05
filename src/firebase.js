import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAG87IEHFzothT6IG5-QcmCuVDQn-B42vE",
  authDomain: "adminpanel-2d6cb.firebaseapp.com",
  projectId: "adminpanel-2d6cb",
  storageBucket: "adminpanel-2d6cb.appspot.com",
  messagingSenderId: "802688650638",
  appId: "1:802688650638:web:f1c8e9a567c8b22280a8df",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
