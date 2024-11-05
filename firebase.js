import { initializeApp } from '@firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAqtNZj9w6a3Z9hMaxjCVpOehhbOIl2zQc",
  authDomain: "dumbelltracker.firebaseapp.com",
  projectId: "dumbelltracker",
  storageBucket: "dumbelltracker.firebasestorage.app",
  messagingSenderId: "684681183010",
  appId: "1:684681183010:web:53284478cde2cd835daf7b",
  measurementId: "G-84LG43QG2H",
};

const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
