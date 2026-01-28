import { db } from './config'
import { collection, doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore'

interface UserData {
    uid: string
    username: string
    email: string
}

export async function saveUserData({ uid, username, email }: UserData) {
    try {
        await setDoc(doc(collection(db, 'users'), uid), {
            username: username,
            email: email,
            createdAt: serverTimestamp(),
        })

    }
    catch (error) {
        throw error
    }
}

export async function getUserProfile(uid: string) {
    try {
        const userRef = doc(db, 'users', uid)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
            throw new Error('Usuário não encontrado')
        }

       return userSnap.data()

    } 
    catch (error) {
        throw error
    }
}


