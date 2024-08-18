// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Configuración de Firebase (reemplaza los valores con tus credenciales reales)
const firebaseConfig = {
    apiKey: "AIzaSyAjA4ddpZvFaA_PWMCTSjpuc047rAziVnE",
    authDomain: "proyecto-deposito-vang.firebaseapp.com",
    projectId: "proyecto-deposito-vang",
    storageBucket: "proyecto-deposito-vang.appspot.com",
    messagingSenderId: "502822647488",
    appId: "1:502822647488:web:4a6bb6255817f5989ddf25",
    measurementId: "G-2B991TXDYJ"
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
