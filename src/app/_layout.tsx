import { Stack, Redirect, Slot } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { Platform } from 'react-native'
import * as NavigationBar from 'expo-navigation-bar'
import { AuthProvider } from '../contexts/AuthContext'



export default function RootLayout() {


  const [fontes] = useFonts({
    PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
    PoppinsLightItalic: require("../../assets/fonts/Poppins-LightItalic.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
  })

  if (!fontes) {
    return null
  }

  if (Platform.OS === 'android') {
    NavigationBar.setButtonStyleAsync('dark')
  }



  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
          <Stack.Screen name='index' />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  )

} 
