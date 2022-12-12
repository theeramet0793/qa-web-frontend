
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdbtLYhH6LcjZtSQ5vXT4kMopBrcyPrGw",
  authDomain: "qa-web-storage-2c296.firebaseapp.com",
  projectId: "qa-web-storage-2c296",
  storageBucket: "qa-web-storage-2c296.appspot.com",
  messagingSenderId: "131747183004",
  appId: "1:131747183004:web:7167faed76d69d619ef059"
};

 export const app = initializeApp(firebaseConfig);
 export const firebaseStorage = getStorage(app);