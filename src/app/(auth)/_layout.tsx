import { Redirect, Slot } from 'expo-router'
import { useAuth } from '../../contexts/AuthContext'

export default function AuthLayout() { // Proteção de Rotas
  const { user, loading } = useAuth()

  if (loading) return null

  // ✅ Se já está logado, manda para home
  if (user) {
    return <Redirect href="/(tabs)/home" />
  }

  return <Slot />
}
