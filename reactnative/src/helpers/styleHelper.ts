const getColor = (color) => {
    switch (color) {
        case 'primary':
            return '#D4AF37'
        case 'secondary':
            return 'white'
        case 'error':
            return 'red'
        case 'warning':
            return 'orange'
        case 'success':
            return 'green'
        case 'info':
            return 'black'
        case 'invisible':
            return 'transparent'
        default:
            return 'black'
    }
}

const getFontSize = (size) => {
    switch (size) {
        case 'xs':
            return 5
        case 'sm':
            return 10
        case 'md':
            return 15
        case 'lg':
            return 20
        case 'xl':
            return 25
        case 'title':
            return 45
        case 'subtitle':
            return 25
        default:
            return 15
    }
}

const getTextInputStyle = ({ size, hasError=false }) => {
    const sizes = {
        xs: { height: 25, padding: 5, fontSize: 12 },
        sm: { height: 30, padding: 7, fontSize: 13 },
        md: { height: 40, padding: 8, fontSize: 14 },
        lg: { height: 60, padding: 12, fontSize: 16 },
        xl: { height: 70, padding: 15, fontSize: 18 },
        default: { height: 50, padding: 10, fontSize: 14 }
    }

    const defaultSize = {
        backgroundColor: '#fff',
        borderRadius: 10,
        fontFamily: 'Lemon-Regular',
        ...sizes.default
    }

    const errorSize = {
        borderColor: '#f00',
        borderWidth: 2,
    }

    const selectedSize = sizes[size] || sizes.default

    return hasError ? { ...defaultSize, ...errorSize, ...selectedSize } : { ...defaultSize, ...selectedSize }
}

const getButtonStyle = ({ size, color, fill=true }) => {
    const sizes = {
        xs: { height: 25, paddingVertical: 5, paddingHorizontal: 10 },
        sm: { height: 30, paddingVertical: 7, paddingHorizontal: 12 },
        md: { height: 40, paddingVertical: 8, paddingHorizontal: 15 },
        lg: { height: 50, paddingVertical: 12, paddingHorizontal: 20 },
        xl: { height: 60, paddingVertical: 15, paddingHorizontal: 25 },
        default: { height: 45, paddingVertical: 10, paddingHorizontal: 18 }
    }

    const colors = getColor(color)

    const defaultContainerStyle = {
        backgroundColor: colors,
        borderColor: '',
        borderRadius: 5,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }

    if (!fill) {
        defaultContainerStyle.backgroundColor = getColor('invisible')
        defaultContainerStyle.borderColor = colors
        defaultContainerStyle.borderWidth = 2
        defaultContainerStyle.borderRadius = 10
    }

    const selectedSize = sizes[size] || sizes.default

    return {
        containerStyle: {
            ...defaultContainerStyle,
            ...selectedSize,
        }
    }
}





export { getColor, getFontSize, getTextInputStyle, getButtonStyle }