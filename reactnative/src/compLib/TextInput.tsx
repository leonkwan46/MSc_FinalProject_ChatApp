import React, { type FC } from 'react'
import { TextInput, View } from 'react-native'
import { getTextInputStyle } from '../helpers/styleHelper'
import useFont from '../SharedHooks/useFont'

interface TextInputProps {
    value: string
    placeholder?: string
    size?: string
    hasError?: boolean
    secureTextEntry?: boolean
    placeholderTextColor?: string
    onChangeText: (text: string) => void
    onBlur?: () => void
    onFocus?: () => void
}

const CustomTextInput: FC<TextInputProps> = ({
    value,
    size,
    placeholder,
    hasError,
    secureTextEntry,
    placeholderTextColor = '#aaa',
    onChangeText,
    onBlur,
    onFocus
}) => {
    const { fontLoaded } = useFont('Lemon-Regular')
    const textInputStyle = getTextInputStyle({size, hasError})
    return (
        <View>
            {fontLoaded ? (
                <TextInput
                    value={value}
                    style={textInputStyle}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            ) : (
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            )}
        </View>
    )
}

export default CustomTextInput