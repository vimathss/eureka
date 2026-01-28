import { router } from 'expo-router'
import { useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input } from '../../components/Input'
import { signIn } from '../../services/firebase/auth'


import { Cores } from '../../constants/Cores'
import { Fontes } from '../../constants/Fontes'

export default function sign_in() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const emailRef = useRef<TextInput>(null)
    const senhaRef = useRef<TextInput>(null)
    const [erro, setErro] = useState('')


    function validarFormulario() {
        if (!email) {
            setErro('Informe o e-mail')
            emailRef.current?.focus()
            return false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setErro('E-mail inválido')
            emailRef.current?.focus()
            return false
        }

        if (!senha) {
            setErro('Informe a senha')
            senhaRef.current?.focus()
            return false
        }

        if (senha.length < 6) {
            setErro('Senha muito curta')
            senhaRef.current?.focus()
            return false
        }

        setErro('')
        return true
    }

    async function autenticarUsuario() {
        const formularioValido = validarFormulario()
        if (!formularioValido) return

        try {
            if (await signIn({ email, senha })) {
                console.log('Usuário autenticado com sucesso!: ', email)
                router.push('../(tabs)/home')
            }
        }

        catch (error: any) {
            console.log(error)
            switch (error.code) {
                case 'auth/invalid-credential':
                    setErro('Credenciais Incorretas')
                    break
                case 'auth/wrong-password':
                    setErro('Senha incorreta')
                    break
                default:
                    setErro('Erro ao autenticar usuário')
            }
        }
    }

    return (
        <SafeAreaView style={estilos.conteiner}>
            <View style={estilos.formConteiner}>
                <Text style={estilos.titulo}>LOGIN</Text>
                <Text style={estilos.subtitulo}>Boas vindas de volta! {"\n"}Acesse via email e senha</Text>
                <View style={estilos.formInputs}>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' enabled={true}>

                        <Input placeholder="E-mail:" value={email} icone="email" onChangeText={setEmail} ref={emailRef} />
                        <Input placeholder="Senha:" value={senha} icone="password" onChangeText={setSenha} ref={senhaRef} />
                        <Text style={estilos.botaoForgotPassword}>Esqueceu a senha?</Text>

                        <View style={estilos.erroContainer}>
                            {erro !== '' && (
                                <Text style={estilos.mensagemErro}>{erro}</Text>
                            )}
                        </View>

                        <Pressable
                            style={({ pressed }) => [
                                estilos.botao,
                                { opacity: pressed ? 0.7 : 1 }
                            ]}
                            android_ripple={{ color: Cores.primariaClara }}
                            onPress={autenticarUsuario}>
                            <Text style={estilos.textoBotao}>Entrar </Text>
                        </Pressable>
                    </KeyboardAvoidingView>

                </View>
            </View>


        </SafeAreaView>

    )
}

const estilos = StyleSheet.create({
    conteiner: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: Cores.primariaEscura,
    },

    formConteiner: {
        backgroundColor: Cores.branco_smoke,
        width: '100%',
        height: '85%',
        alignItems: 'center',
        borderTopStartRadius: 35,
        borderTopEndRadius: 35,
        padding: 50,
    },

    titulo: {
        fontSize: Fontes.grande1,
        fontFamily: Fontes.baseSemiBold,
        color: Cores.primariaClara,
        marginTop: 70,
        lineHeight: 20,
        alignSelf: 'flex-start',
    },

    subtitulo: {
        fontSize: Fontes.medio1,
        fontFamily: Fontes.baseRegular,
        color: Cores.preto,
        alignSelf: 'flex-start',
        marginTop: 10,
        lineHeight: 20,
    },

    formInputs: {
        width: '100%',
        marginTop: 70,
    },

    inputConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderWidth: 1,
        backgroundColor: Cores.branco,
        borderColor: Cores.cinza_claro,
        marginTop: 20,
        paddingHorizontal: 15,
    },

    textInput: {
        flex: 1,
        color: Cores.cinza,
    },

    botaoForgotPassword: {
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
        fontFamily: Fontes.baseLightItalic,
        fontSize: Fontes.pequeno,
        color: Cores.cinza,
        height: 30,
        marginTop: 10,

    },
    erroContainer: {
        minHeight: 20, // ou 24 / 30
        marginBottom: 0,
        justifyContent: 'flex-start',
    },

    mensagemErro: {
        color: Cores.erro,
        textAlign: 'left',
        fontSize: 14,
    },

    botao: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Cores.primariaClara,
        height: 60,
        width: "100%",
        marginTop: 10,
    },

    textoBotao: {
        color: Cores.branco,
        fontFamily: Fontes.baseBold,
        fontSize: Fontes.medio2,
    },




})
