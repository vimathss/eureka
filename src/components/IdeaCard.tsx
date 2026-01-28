import { Image, Text, StyleSheet, Pressable, View } from 'react-native'
import { router } from 'expo-router'
import { Fontes } from '../constants/Fontes'
import { Cores } from '../constants/Cores'

interface IdeaCardProps {
    title: string
    text: string
    createdAt: string
}

export function IdeaCard({ title, text, createdAt }: IdeaCardProps) {
    return (
        <Pressable
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 5 })}

        >
            <View style={estilos.conteiner}>
                <Text style={estilos.titulo}>{title}</Text>

                <Text
                    style={estilos.texto}
                    numberOfLines={10}
                    ellipsizeMode="tail"
                >
                    {text}
                </Text>

                <Text style={estilos.data}>{createdAt}</Text>
            </View>
        </Pressable>
    )
}

const estilos = StyleSheet.create({
    conteiner: {
        backgroundColor: Cores.primaria,
        borderColor: Cores.primariaClara,
        minHeight: 100,
        maxHeight: 300,
        width: 180,
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        paddingBottom: 30, 
        position: 'relative',
        overflow: 'hidden',
    },

    titulo: {
        fontFamily: Fontes.baseBold,
        fontSize: Fontes.pequeno,
        color: Cores.branco,
        textAlign: 'justify',

    },

    texto: {
        fontFamily: Fontes.baseRegular,
        fontSize: Fontes.pequeno,
        color: Cores.branco,
        textAlign: 'left',
        flexShrink: 1,

    },

  data: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    fontFamily: Fontes.baseRegular,
    fontSize: Fontes.pequeno,
    color: Cores.cinza,
},

})
