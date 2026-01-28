import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Fontes } from '../constants/Fontes'
import { Cores } from '../constants/Cores'



export function Cabecalho() {

    const rotaUser = () => {
        router.push('../(tabs)/profile')
    }

    return (
        <View style={estilos.conteiner}>
            
            <Image source={require('@/assets/eureka-logo.png')} style={estilos.logo} resizeMode='contain' />

            <Pressable
                style={estilos.logout}
                onPress={rotaUser}
            >
                <MaterialIcons name="person" size={Fontes.grande1} color={Cores.branco} />
            </Pressable>
        </View>
    )
}

const estilos = StyleSheet.create({
    conteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
    },

    logo: {
        width: 130,

        alignSelf: 'center',
        alignContent:'center'
    },
    logout: {
        width: '10%',
        alignItems: 'center',
        right: 25,
        position: 'absolute',
        justifyContent: 'center',
        height: '100%',
    },


})