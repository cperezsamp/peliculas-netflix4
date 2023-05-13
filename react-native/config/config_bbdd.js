import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyAfgfPRYfKJaxz3dpTlnpKsZXLOlEoZzi8",

  authDomain: "peliculas-netflix-faa3a.firebaseapp.com",

  projectId: "peliculas-netflix-faa3a",

  storageBucket: "peliculas-netflix-faa3a.appspot.com",

  messagingSenderId: "300907069864",

  appId: "1:300907069864:web:2f6ba6da4bac87c6fc9d9d"

};

const database = initializeApp(firebaseConfig);
export const db = getFirestore();