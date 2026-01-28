import { Redirect, Tabs, Slot } from 'expo-router'
import { useAuth } from '../../contexts/AuthContext'

export default function TabsLayout() { // Proteção de Rotas
  const { user, loading } = useAuth()

  if (loading) return null

  // ❌ Não logado → volta para login
  if (!user) {
    return <Redirect href="/(auth)/sign-in" />
  }

  return <Slot />
}
