import React, { type FC } from 'react'
import { TextInput, View } from 'react-native'
import { getContainerStyle } from '../helpers/styleHelper'
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
}

const CustomTextInput: FC<TextInputProps> = ({
    value,
    size,
    placeholder,
    hasError,
    secureTextEntry,
    placeholderTextColor = '#aaa',
    onChangeText,
    onBlur
}) => {
    const { fontLoaded } = useFont('Lemon-Regular')
    const containerStyle = getContainerStyle({size, hasError})
    return (
        <View>
            {fontLoaded ? (
                <TextInput
                    value={value}
                    style={containerStyle}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                />
            ) : (
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                />
            )}
        </View>
    )
}

export default CustomTextInput