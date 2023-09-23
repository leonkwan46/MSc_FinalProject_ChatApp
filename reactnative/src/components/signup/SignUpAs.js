import { useState, React } from 'react'
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native"
import { Overlay } from 'react-native-elements'
import OverlayInfo from './OverlayInfo'

const SignUpAs = () => {
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState([
        { id: 1, name: 'Student / Parents', selected: true },
        { id: 2, name: 'Teacher', selected: false },
    ])

    const handleOnPress =(id) => {
        const newSelected = selected.map((item) => {
            if (item.id === id) {
                if (item.id === 2) {
                    setVisible(true)
                }
                return { ...item, selected: true }
            }
            return { ...item, selected: false }
        })
        setSelected(newSelected)
    }

    return (
        <View style={ styles.borderline }>
            <View style={ styles.container }>
                <View style={styles.textAsContainer}>
                    <Text style={styles.textAs}>As: </Text>
                </View>
                <View style={styles.selectionContainer}>
                    <FlatList
                        scrollEnabled={false}
                        data={selected}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => handleOnPress(item.id)} style={styles.selections}>
                                {item.selected ?
                                    <Text style={styles.selected}>{item.name}</Text> :                                
                                    <Text style={styles.unselected}>{item.name}</Text>
                                }
                            </Pressable>
                        )}
                    />
                    <View>
                        <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)} overlayStyle={styles.overlay}>
                            <OverlayInfo />
                        </Overlay>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    borderline: {
        borderWidth: 2,
        borderColor: '#D4AF37',
        borderRadius: 10,
        marginBottom: 20,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 110,
    },
    selectionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    selections: {
        display: 'flex',
        alignItems: 'center',
        margin: (0, 10)
    },
    textAsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '20%',
        marginRight: 20,
    },
    textAs: {
        fontFamily: 'Lemon-Regular',
        fontSize: '25px',
        color: '#D4AF37',
    },
    selected: {
        fontFamily: 'Lemon-Regular',
        fontSize: '20px',
        color: '#D4AF37',
    },
    unselected: {
        fontFamily: 'Lemon-Regular',
        fontSize: '20px',
        color: 'rgba(212, 175, 55, 0.5)',
    },
    divider: {
        height: 2,
        backgroundColor: '#D4AF37',
    },
    overlay: {
        width: '70%',
        height: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
})
export default SignUpAs