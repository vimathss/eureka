import { StyleSheet, TextInput, View, Pressable } from 'react-native'
import {useRef} from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Fontes } from '../constants/Fontes'
import { Cores } from '../constants/Cores'



interface TextInputProps {
    placeholder: string
    value?: string
    icone?: keyof typeof MaterialIcons.glyphMap
    ref?: React.Ref<TextInput>
    onChangeText?: (text: string) => void
}

export function Input({ placeholder, value, icone, onChangeText, ref }: TextInputProps) {
    return (
        <View style={estilos.inputConteiner}>
            <TextInput
                style={estilos.textInput}
                placeholder={placeholder}
                placeholderTextColor={Cores.cinza}
                value={value}
                onChangeText={onChangeText}
                ref={ref}
            />
            {icone && <MaterialIcons name={icone} size={Fontes.medio2} color={Cores.cinza} />}
        </View>
)}

const estilos = StyleSheet.create({
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
})

