import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, View, Pressable, Text, FlatList } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Cabecalho } from '../../components/Cabecalho'
import { IdeaCard } from '../../components/IdeaCard'
import { Cores } from '../../constants/Cores'
import { Fontes } from '../../constants/Fontes'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useAuth } from '@/src/contexts/AuthContext'
import { listenUserIdeas } from '@/src/services/firebase/ideas'

export default function home() {
    const [ideas, setIdeas] = React.useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()

    useEffect(() => {
        if (!user) return

        const unsubscribe = listenUserIdeas(user.uid, (data) => {
            setIdeas(data)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    const rotaIdeias = () => {
        router.push('../(tabs)/ideas')
    }
    return (
        <SafeAreaView style={estilos.conteiner}>
            <Cabecalho />
            <View style={estilos.conteinerTela}>

                <FlatList
                    data={ideas}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <IdeaCard
                            title={item.title}
                            text={item.content}
                            createdAt={item.createdAt.toDate().toLocaleDateString('pt-BR')}
                        />
                    )}
                    columnWrapperStyle={{ gap: 30 }}
                    contentContainerStyle={{ padding: 16 }}
                />
            </View>
            <Pressable
                style={({ pressed }) => [
                    estilos.botaoAddIdeia,
                    { opacity: pressed ? 0.7 : 1 },
                ]}
                onPress={rotaIdeias}
            >
                <MaterialIcons name="lightbulb" size={Fontes.grande1} color={Cores.branco} />
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
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
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