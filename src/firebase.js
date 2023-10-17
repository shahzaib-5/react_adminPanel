import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
<<<<<<< HEAD
import {getFirestore} from "firebase/firestore"
import{getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBvAJR7d5JL_sCo9PiZtbHwHc3Dl_7SI8Y",
  authDomain: "kisaane-sahulat.firebaseapp.com",
  projectId: "kisaane-sahulat",
  storageBucket: "kisaane-sahulat.appspot.com",
  messagingSenderId: "453675542258",
  appId: "1:453675542258:web:6c1d886d88d1227657126b"
  // apiKey: "AIzaSyAG87IEHFzothT6IG5-QcmCuVDQn-B42vE",
  // authDomain: "adminpanel-2d6cb.firebaseapp.com",
  // projectId: "adminpanel-2d6cb",
  // storageBucket: "adminpanel-2d6cb.appspot.com",
  // messagingSenderId: "802688650638",
  // appId: "1:802688650638:web:f1c8e9a567c8b22280a8df",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()
export const storage= getStorage(app)
=======

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
>>>>>>> e06c6d5b1fab4b867e2a612356feaa5aa9cc6fb1
