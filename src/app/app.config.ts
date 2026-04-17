import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Firebase Imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAgRRGFzihfdHjNU_R0yJ41TE9U56bWLIA",
  authDomain: "codecatalyst-79b69.firebaseapp.com",
  projectId: "codecatalyst-79b69",
  storageBucket: "codecatalyst-79b69.firebasestorage.app",
  messagingSenderId: "1006366123034",
  appId: "1:1006366123034:web:ee3a2464e75a65a2dadda3",
  measurementId: "G-VCBTYDKL39"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Yahan Firebase initialize karna zaroori hai
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};