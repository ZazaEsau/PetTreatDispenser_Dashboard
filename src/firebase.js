import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyA6HCY9PUED9NtLzsS4XcqrstvA1Bq4pfw",
  authDomain: "integradora-fe847.firebaseapp.com",
  databaseURL: "https://integradora-fe847-default-rtdb.firebaseio.com",
  projectId: "integradora-fe847",
  storageBucket: "integradora-fe847.appspot.com",
  messagingSenderId: "725719343351",
  appId: "1:725719343351:web:16325acf728586ed3cb3f2",
  measurementId: "G-W5XPQE9G7W"
};

const app = initializeApp(firebaseConfig);
export default app;
export const db = getDatabase(app);
