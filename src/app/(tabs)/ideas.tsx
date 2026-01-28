import { StyleSheet, View, Pressable, Text, TextInput } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Cabecalho } from '../../components/Cabecalho'
import { Cores } from '../../constants/Cores'
import { Fontes } from '../../constants/Fontes'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { saveIdea } from '../../services/firebase/ideas'
import { useAuth } from '@/src/contexts/AuthContext'
import { router } from 'expo-router'



export default function ideas() {

    const { user, loading } = useAuth()
    const [titulo, setTitulo] = useState('')
    const [ideia, setIdeia] = useState('')

    const rotaHome = () => {
        router.back()
    }
    const sendIdea = () => {
        if (user?.uid) {
 
            saveIdea(user.uid, titulo, ideia)
        }
    }
    return (

        <SafeAreaView style={estilos.conteiner}>
            <Cabecalho />
            <View style={estilos.conteinerTela}>

                <TextInput style={estilos.inputTitulo}
                    placeholder="Título"
                    placeholderTextColor={Cores.cinza}
                    multiline={true}
                    numberOfLines={2}
                    value={titulo}
                    onChangeText={setTitulo}
                />
                <TextInput style={estilos.inputIdeia}
                    placeholder="Descreva sua ideia..."
                    placeholderTextColor={Cores.cinza}
                    multiline={true}
                    numberOfLines={4}
                    value={ideia}
                    onChangeText={setIdeia}
                />
            </View>

            <Pressable
                style={({ pressed }) => [
                    estilos.botaoAddIdeia,
                    { opacity: pressed ? 0.7 : 1 },
                ]}
                onPress={sendIdea}
            >
                <MaterialIcons name="save" size={Fontes.grande1} color={Cores.branco} />
            </Pressable>

        </SafeAreaView >
    )
}

const estilos = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: Cores.primariaEscura,
        alignContent: 'center',
    },
    conteinerTela: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: 30,
    },



    inputTitulo: {
        width: '100%',
        minHeight: 20,
        padding: 10,
        fontFamily: Fontes.baseSemiBold,
        fontSize: Fontes.medio1,
        color: Cores.branco,
    },

    inputIdeia: {
        width: '100%',
        minHeight: 300,
        maxHeight: 600,
        flexShrink: 1,
        padding: 10,
        fontFamily: Fontes.baseRegular,
        fontSize: Fontes.pequeno,
        color: Cores.branco,
        textAlignVertical: 'top',
    },

    botaoAddIdeia: {
        width: 60,
        height: 60,
        backgroundColor: Cores.primariaClara,
        borderColor: Cores.cinza,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 100,
        right: 30,
    },


})