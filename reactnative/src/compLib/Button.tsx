import React, { type FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import useFont from '../SharedHooks/useFont'
import { getButtonStyle } from '../helpers/styleHelper'

interface ButtonProps {
    children: string
    color?: string
    size?: string
    onPress: () => void
}

const Button: FC<ButtonProps> = ({ children, color, size, onPress }) => {
    const { fontLoaded } = useFont('Lemon-Regular')
    const { containerStyle, fontStyle } = getButtonStyle({ size, color })
    const { fontFamily, fontSize } = fontStyle
    return (
        <View>
            {fontLoaded ? (
                <Pressable onPress={onPress} style={containerStyle}>
                    <Text style={{ fontFamily, fontSize }}>
                        {children}
                    </Text>
                </Pressable>
            ) : (
                <Pressable onPress={onPress} style={containerStyle}>
                    <Text>
                        {children}
                    </Text>
                </Pressable>
            
            )}

        </View>
    )
}

export default Button