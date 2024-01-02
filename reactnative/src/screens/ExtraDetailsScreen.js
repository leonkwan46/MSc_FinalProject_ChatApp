import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContainerExtraDetails from '../components/extraDetails/ContainerExtraDetails'
import { setCurrentScreen } from '../redux/reducer/sessionSlice'
import TopHeading from '../components/SharedComponents/TopHeading'
import FormGeneral from '../components/extraDetails/FormGeneral'
import { StyleSheet, View } from 'react-native'
import FormTeacher from '../components/extraDetails/FormTeacher'

const ExtraDetailsScreen = () => {
    const dispatch = useDispatch()
    const role = useSelector(state => state.session.user.role)
    const isGeneralFormComplete = useSelector(state => state.signUpInfo.isGeneralFormComplete)

    useEffect(() => {
        dispatch(setCurrentScreen({ title: 'EXTRADETAILS', subtitle: `for ${role}s` }))
    }, [])

    return (
        <ContainerExtraDetails>
            <View style={ styles.container }>
                <TopHeading />
                <FormTeacher />
                {/* { !isGeneralFormComplete && <FormGeneral /> } */}
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