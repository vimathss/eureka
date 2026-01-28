import { router } from 'expo-router'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Cores } from '../constants/Cores'
import { Fontes } from '../constants/Fontes'

export default function index() {



const rotaLogin = () => {
    router.push('./(auth)/sign-in')
}

const rotaRegister = () => {
    router.push('./(auth)/sign-up')
}

return (
    <SafeAreaView style={estilos.conteiner}>
        <Image source={require('@/assets/eureka-logo.png')} style={estilos.logo} resizeMode='contain' />
        <View style={estilos.botoesConteiner}>
            <Pressable
                style={({ pressed }) => [
                    estilos.botaoLogin,
                    { opacity: pressed ? 0.7 : 1 }
                ]}
                onPress={rotaLogin}>
                <Text style={{ color: Cores.branco, fontSize: Fontes.medio2, fontFamily: Fontes.baseBold }}>Login</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [
                    estilos.botaoRegister,
                    { opacity: pressed ? 0.7 : 1 }
                ]}
                onPress={rotaRegister}>
                <Text style={{ color: Cores.branco, fontSize: Fontes.pequeno, fontFamily: Fontes.baseLightItalic, textDecorationLine: 'underline' }}>Não possui uma conta?</Text>
            </Pressable>
        </View>
    </SafeAreaView>

)
}

const estilos = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Cores.primariaEscura,
    },

    logo: {
        width: 250,
        top: 200,
    },

    botoesConteiner: {
        bottom: 100,
        alignItems: 'center',
        position: 'absolute',
    },

    botaoLogin: {
        width: 250,
        height: 60,
        backgroundColor: Cores.primariaClara,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    botaoRegister: {
        width: 250,
        height: 60,
        marginTop: 10,
        alignItems: 'center',
    }




})
