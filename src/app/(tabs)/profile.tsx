import { StyleSheet, View, Pressable, Text, Image } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Cores } from '../../constants/Cores'
import { Fontes } from '../../constants/Fontes'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useAuth } from '@/src/contexts/AuthContext'
import {signOut} from '../../services/firebase/auth'

export default function profile() {
    const { user, loading } = useAuth()

    const rotaDeslogar = () => {
        signOut()
        // router.replace('/')
    }

    const rotaBack = () => {
        router.back()
    }

    const rotaAbout = () => {
        router.push('../(tabs)/about')
    }

    return (
        <SafeAreaView style={estilos.conteiner}>
            <View style={estilos.cabecalho}>
                <Pressable
                    style={estilos.voltarHome}
                    onPress={rotaBack}
                >
                    <MaterialIcons name="arrow-back" size={Fontes.medio2} color={Cores.cinza} />
                </Pressable>

                <Image source={require('@/assets/eureka-dark-logo.png')} style={estilos.logo} resizeMode='contain' />

                <Pressable
                    style={estilos.logout}
                    onPress={rotaDeslogar}
                >
                    <MaterialIcons name="logout" size={Fontes.medio2} color={Cores.cinza} />
                </Pressable>
            </View>

            <View style={estilos.conteinerTela}>
                <View style={estilos.userFoto}>
                    <MaterialIcons name="person" size={Fontes.extraGrande} color={Cores.branco} />
                </View>
                <Text style={estilos.textoUsername}>{user?.username}</Text>
                <Text style={estilos.textoUserEmail}>{user?.email}</Text>

            </View>
            <Pressable
                style={({ pressed }) => [
                    estilos.textoMaisInfo,
                    { opacity: pressed ? 0.7 : 1 }
                ]}
                onPress={rotaAbout}>
                <Text style={{ color: Cores.cinza, fontSize: Fontes.pequeno, fontFamily: Fontes.baseLightItalic, textDecorationLine: 'underline' }}>Mais informações sobre o App</Text>
            </Pressable>
        </SafeAreaView >
    )
}

const estilos = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: Cores.branco,
        alignContent: 'center',
    },

    cabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70,
        paddingHorizontal: 30,
    },

    logo: {
        width: 130,
        alignSelf: 'center',
        alignContent: 'center'
    },
    voltarHome: {
        width: '10%',
        alignItems: 'center',
    },
    logout: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },

    conteinerTela: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    userFoto: {
        backgroundColor: Cores.primariaClara,
        marginTop: 80,
        borderRadius: 100,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
    },
    textoUsername: {
        marginTop: 20,
        fontSize: Fontes.medio1,
        fontFamily: Fontes.baseSemiBold,
        lineHeight: 20,
    },
    textoUserEmail: {
        fontSize: Fontes.pequeno,
        fontFamily: Fontes.baseRegular,
        color: Cores.cinza,
    },

    textoMaisInfo: {
        alignSelf: 'center',
        marginBottom: 30,
        fontSize: Fontes.pequeno,
        fontFamily: Fontes.baseLightItalic,
        textDecorationLine: 'underline',
        color: Cores.cinza,
    }



})