import { useState, React } from 'react'
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import { useDispatch } from 'react-redux'
import AttentionOverlay from './AttentionOverlay'
import { openTeacherOverlay, collectUserRole } from '../../redux/reducer/signUpInfoSlice'

const roles = [
    { id: 1, name: 'Student / Parents', selected: true },
    { id: 2, name: 'Teacher', selected: false },
]

const SignUpAs = () => {

    const dispatch = useDispatch()
    const [selected, setSelected] = useState(roles)

    const handleOnPress = (id) => {
        const newSelected = selected.map((item) => {
            if (item.id === id) {
                if (id === 2) {
                    dispatch(collectUserRole({ role: 'teacher' }))
                    dispatch(openTeacherOverlay())
                } else {
                    dispatch(collectUserRole({ role: 'student' }))
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
                                 <Text style={item.selected ? styles.selected : styles.unselected}>{item.name}</Text>
                            </Pressable>
                        )}
                    />
                    <AttentionOverlay />
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
})
export default SignUpAs