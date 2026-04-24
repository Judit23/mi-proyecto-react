// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importante para la base de datos

const firebaseConfig = {
  apiKey: "AIzaSyD4B7xTHSH2f30oUcfjcYb2UYDX7H0VUos",
  authDomain: "presupuestoedificios.firebaseapp.com",
  projectId: "presupuestoedificios",
  storageBucket: "presupuestoedificios.firebasestorage.app",
  messagingSenderId: "31623218204",
  appId: "TU_APP_ID_QUE_SALE_MAS_ABAJO" // Copia el appId completo de tu pantalla
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la base de datos para usarla en el formulario
export const db = getFirestore(app);