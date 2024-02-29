import { useState, React } from 'react'
import { View, FlatList, StyleSheet, Pressable } from 'react-native'
import { useDispatch } from 'react-redux'
import AttentionOverlay from './AttentionOverlay'
import { openTeacherOverlay, collectUserRole } from '../../redux/reducer/signUpInfoSlice'
import { Typography } from '../../compLib'

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
                    <Typography size='xl' color='secondary'>As: </Typography>
                </View>
                <View style={styles.selectionContainer}>
                    <FlatList
                        scrollEnabled={false}
                        data={selected}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => handleOnPress(item.id)} style={styles.selections}>
                                 <Typography color='secondary' selected={item.selected}>{item.name}</Typography>
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
})
export default SignUpAs