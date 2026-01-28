import { router } from 'expo-router'
import { useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input } from '../../components/Input'
import { signUp } from '../../services/firebase/auth'
import {saveUserData} from '../../services/firebase/user'
import { Cores } from '../../constants/Cores'
import { Fontes } from '../../constants/Fontes'

export default function sign_up() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmsenha] = useState('')
    const [erro, setErro] = useState('')

    const usernameRef = useRef<TextInput>(null)
    const emailRef = useRef<TextInput>(null)
    const senhaRef = useRef<TextInput>(null)
    const confirmSenhaRef = useRef<TextInput>(null)



    function validarFormulario() {
        if (!username) {
            setErro('Informe o nome de usuário')
            usernameRef.current?.focus()
            return false
        }
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

        if (!confirmSenha) {
            setErro('Confirme a senha')
            confirmSenhaRef.current?.focus()
            return false
        }

        if (senha !== confirmSenha) {
            setErro('As senhas não coincidem')
            confirmSenhaRef.current?.focus()
            return false
        }

        setErro('')
        return true
    }

    async function autenticarUsuario() {
        const formularioValido = validarFormulario()
        if (!formularioValido) return

        try {
            const user = await signUp({ email, senha })
            if (user) {
                console.log('Usuário registrado com sucesso!: ', email)
                saveUserData({uid: user, username: username, email: email})
                router.push('../(tabs)/home')
            }
        }

        catch (error: any) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setErro('E-mail já cadastrado')
                    break
                default:
                    setErro('Erro ao registrar usuário')
            }
        }


    }



    return (
        <SafeAreaView style={estilos.conteiner}>
            <View style={estilos.formConteiner}>
                <Text style={estilos.titulo}>REGISTER</Text>
                <Text style={estilos.subtitulo}>Crie sua conta e anote suas ideias</Text>
                <View style={estilos.formInputs}>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' enabled={true}>
                        <Input placeholder="Username:" value={username} icone="person" onChangeText={setUsername} ref={usernameRef} />
                        <Input placeholder="E-mail:" value={email} icone="email" onChangeText={setEmail} ref={emailRef} />
                        <Input placeholder="Senha:" value={senha} icone="password" onChangeText={setSenha} ref={senhaRef} />
                        <Input placeholder="Confirme sua senha:" value={confirmSenha} icone="password" onChangeText={setConfirmsenha} ref={confirmSenhaRef} />

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
                            <Text style={estilos.textoBotao}>Entrar</Text>
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
        marginTop: 30,
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

    erroContainer: {
        marginTop: 10,
        minHeight: 20,
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
