import { initializeApp } from 'firebase/app'
import {getAuth, setPersistence, browserLocalPersistence, inMemoryPersistence} from 'firebase/auth'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from 'firebase/firestore'; // Importa o serviço do Firestor

const firebaseConfig = {
    // Firebase Keys aqui
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
