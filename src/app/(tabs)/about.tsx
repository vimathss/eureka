import { StyleSheet, View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Cores } from '../../constants/Cores'
import { Fontes } from '../../constants/Fontes'

export default function about(){

    return(
        <SafeAreaView style={estilos.conteiner}>  
            <View style={estilos.conteinerTela}>

                <Image 
                    style={estilos.foto}
                    source={require('@/assets/desenvolvedor.jpg')}
                />

                <Text style={estilos.nome}>Desenvolvedor</Text>
                <Text style={estilos.descricao}>App para anotações de ideias de projetos de TI de forma simples e ágil.</Text>
                <Text style={estilos.versao}>Versão 0.1</Text>

                <View style={estilos.tecnologias}>
                    <Image 
                        style={estilos.tecnologia}
                        source={require('@/assets/react-native.jpg')}
                    />
                    <Image 
                        style={estilos.tecnologia}
                        source={require('@/assets/android.jpg')}
                    />
                    <Image 
                        style={estilos.tecnologia}
                        source={require('@/assets/js.jpg')}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: Cores.primariaEscura
    },
    conteinerTela: {
        marginTop: 20,
        padding: 10,
        alignItems: 'center'
    },
    foto: {
        height: 200,
        width: 200,
        borderRadius: 100,
        marginVertical: 30,        
        borderWidth: 1,
    },
    nome: {
        color: "pink",
        fontFamily: Fontes.baseRegular,
        fontSize: Fontes.grande1,
        marginBottom: 18,
    },
    descricao: {
        color: 'red',
        fontFamily: Fontes.baseRegular,
        fontSize: Fontes.medio1,
        textAlign: 'center',
        marginBottom: 18,
    },
    versao: {
        color: Cores.primariaClara,
        fontSize: Fontes.medio1,
        marginBottom: 50
    },
    tecnologias: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    tecnologia: {     
        height: 110,
        width: 110,
        borderRadius: 50,
        borderWidth: 2,
    },
})
