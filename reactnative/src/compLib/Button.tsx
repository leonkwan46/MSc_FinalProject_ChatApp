import React, { type FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import useFont from '../SharedHooks/useFont'
import { getButtonStyle } from '../helpers/styleHelper'

interface ButtonProps {
    children: string
    color?: string
    size?: string
    fill?: boolean
    extraStyles?: object
    onPress: () => void
}

const Button: FC<ButtonProps> = ({
    children,
    color,
    size,
    fill,
    extraStyles,
    onPress
}) => {
    const { containerStyle } = getButtonStyle({ size, color, fill })
    const style = {
        ...containerStyle,
        ...extraStyles
    }
    return (
        <View>
            <Pressable onPress={onPress} style={style}>
                {children}
            </Pressable>
        </View>
    )
}

export default Button