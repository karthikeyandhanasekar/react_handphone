
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyB0EArEXVYfrclwCUFVHEipJRPFhbPsZnM",
    authDomain: "react-handphone.firebaseapp.com",
    projectId: "react-handphone",
    storageBucket: "react-handphone.appspot.com",
    databaseURL: "https://react-handphone-default-rtdb.firebaseio.com",
    messagingSenderId: "230214485038",
    appId: "1:230214485038:web:daab536a681c64792a8bbf",
    measurementId: "G-HVZJ90R3T4"
};

// Initialize Firebase  
export const  FirebaseApplication = initializeApp(firebaseConfig);
getAnalytics(FirebaseApplication);


export const database = getFirestore(FirebaseApplication)
