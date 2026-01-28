import { initializeApp } from 'firebase/app'
import {getAuth, setPersistence, browserLocalPersistence, inMemoryPersistence} from 'firebase/auth'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from 'firebase/firestore'; // Importa o serviço do Firestor

const firebaseConfig = {
    apiKey: "AIzaSyCdG3PmXj_9-rmlmbiWWgini64j8Ns3-eI",
    authDomain: "eureka-d9dbc.firebaseapp.com",
    projectId: "eureka-d9dbc",
    storageBucket: "eureka-d9dbc.firebasestorage.app",
    messagingSenderId: "907035568339",
    appId: "1:907035568339:web:a8d6a9e84418d548bc0c26",
    measurementId: "G-27XKWXCWEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firebase Authentication
export const auth = getAuth(app)

// Persistência
if (Platform.OS === 'web') {
  setPersistence(auth, browserLocalPersistence)
} else {
  setPersistence(auth, inMemoryPersistence)
}
// Inicializa o Cloud Firestore
export const db = getFirestore(app);