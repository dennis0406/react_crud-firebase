import { initializeApp } from "firebase/app"
import { getStorage} from "firebase/storage"
import {getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDMWz33HWezuT_twBv0G2N3h3vabBXMYXI",
  authDomain: "midterm-crud.firebaseapp.com",
  projectId: "midterm-crud",
  storageBucket: "midterm-crud.appspot.com",
  messagingSenderId: "1049862613876",
  appId: "1:1049862613876:web:532f49a72a94022ec09a21"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const storage = getStorage(app)