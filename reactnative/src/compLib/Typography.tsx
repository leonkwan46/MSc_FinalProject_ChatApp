import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import * as Font from 'expo-font'

interface TypographyProps {
    children: string
    color?: string
    size?: number
    onClick?: () => void
}

const Typography: React.FC<TypographyProps> = ({ children, color }) => {
    const [fontLoaded, setFontLoaded] = useState(false)
    const customFont = {
        'Lemon-Regular': require('../../assets/fonts/Lemon-Regular.ttf'),
    }

    useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync(customFont)
            setFontLoaded(true)
        }
        loadFont()
    }, [])

    let colour = ''
    switch (color) {
        case 'primary' :
            colour = '#D4AF37'
            break
        case 'secondary' :
            colour = 'white'
            break
        case 'error' :
            colour = 'red'
            break
        case 'success' :
            colour = 'green'
            break
        case 'info' :
            colour = 'black'
            break
        default:
            colour = 'black'
    }
    
    return (
        <View>
            {fontLoaded ? (
                <Text style={{ fontFamily: 'Lemon-Regular' }}>{children}</Text>
            ) : (
                <Text>{children}</Text>
            )}
        </View>
    )
}

export default Typography

