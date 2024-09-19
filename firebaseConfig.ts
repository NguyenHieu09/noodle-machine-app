// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAEIVSGEe0vkKBmyE2-7rQWJ0f1WOV5qno",
//     authDomain: "test-fire-base-dbf67.firebaseapp.com",
//     projectId: "test-fire-base-dbf67",
//     storageBucket: "test-fire-base-dbf67.appspot.com",
//     messagingSenderId: "320389332997",
//     appId: "1:320389332997:web:8fdd04718e872f35645c6c",
//     measurementId: "G-8FHBYE8RNB"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const firestore = getFirestore(app);

// export { app, auth, firestore };
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAEIVSGEe0vkKBmyE2-7rQWJ0f1WOV5qno',
    authDomain: 'test-fire-base-dbf67.firebaseapp.com',
    projectId: 'test-fire-base-dbf67',
    storageBucket: 'test-fire-base-dbf67.appspot.com',
    messagingSenderId: '320389332997',
    appId: '1:320389332997:web:8fdd04718e872f35645c6c',
    measurementId: 'G-8FHBYE8RNB'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore(app);

export { app, auth, firestore };