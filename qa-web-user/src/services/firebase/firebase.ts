
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCt2pPDeqZ0_NP82kDl4b1fEiiFQPdeGiA",
  authDomain: "qa-web-user.firebaseapp.com",
  projectId: "qa-web-user",
  storageBucket: "qa-web-user.appspot.com",
  messagingSenderId: "911992988511",
  appId: "1:911992988511:web:f29529c0e7b51a66d78cea"
};

 export const app = initializeApp(firebaseConfig);
 export const firebaseStorage = getStorage(app);