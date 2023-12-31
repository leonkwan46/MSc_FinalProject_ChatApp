import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContainerExtraDetails from '../components/extraDetails/ContainerExtraDetails'
import { setCurrentScreen } from '../redux/reducer/sessionSlice'
import TopHeading from '../components/SharedComponents/TopHeading'
import FormGeneral from '../components/extraDetails/FormGeneral'
import { StyleSheet, View } from 'react-native'

const ExtraDetailsScreen = () => {
    const dispatch = useDispatch()
    const role = useSelector(state => state.session.user.role)
    useEffect(() => {
        dispatch(setCurrentScreen({ title: 'EXTRADETAILS', subtitle: `for ${role}s` }))
    }, [])

    return (
        <ContainerExtraDetails>
            <View style={ styles.container }>
                <TopHeading />
                <FormGeneral />
            </View>
        </ContainerExtraDetails>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
})

export default ExtraDetailsScreen