
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5ESZHo5t4h97BbpW3U3RZOUBDpZtHBLo",
  authDomain: "inceptionuproject3-338004.firebaseapp.com",
  projectId: "inceptionuproject3-338004",
  storageBucket: "inceptionuproject3-338004.appspot.com",
  messagingSenderId: "578538869254",
  appId: "1:578538869254:web:5c235e1f61e639f3daa987",
  measurementId: "G-4E537BVZ8L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

