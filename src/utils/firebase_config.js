import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: "chalchitragpt.firebaseapp.com",
	projectId: "chalchitragpt",
	storageBucket: "chalchitragpt.appspot.com",
	messagingSenderId: "425821884337",
	appId: "1:425821884337:web:b2ac9200812ab1d3b63790",
	measurementId: "G-XR11MXB3JS"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);