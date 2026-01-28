import { auth } from '@/src/services/firebase/config'
import { getUserProfile } from '@/src/services/firebase/user'
import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'


interface User {
  uid: string
  email: string
  username: string
}

interface AuthContextData {
  user: User | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
)

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const profile = await getUserProfile(firebaseUser.uid)

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        username: profile.username,
      })
    } else {
      setUser(null)
    }

    setLoading(false)
  })

  return unsubscribe
}, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}