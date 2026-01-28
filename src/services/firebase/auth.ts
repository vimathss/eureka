import { auth } from './config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'


interface signInProps {
    email: string
    senha: string
}

interface signUpProps {
    email: string
    senha: string
}

export async function signIn({ email, senha }: signInProps) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha)
        return userCredential.user 

    }

    catch (error) {
        throw error
    }
}

export async function signUp({ email, senha }: signUpProps) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha)
        return userCredential.user.uid
    }

    catch (error) {
        throw error
    }
}

export async function signOut() {
    try {
        await auth.signOut()
    } catch (error) {
        throw error
    }
}