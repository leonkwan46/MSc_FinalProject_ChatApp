import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { testParentSesh, testTeacherSesh } from '../redux/reducer/sessionSlice'
import ContainerExtraDetails from '../components/extraDetails/ContainerExtraDetails'
import TopHeading from '../components/SharedComponents/TopHeading'
import FormGeneral from '../components/extraDetails/FormGeneral'
import FormTeacher from '../components/extraDetails/FormTeacher'
import FormParent from '../components/extraDetails/FormParent'
import { testParent, testTeacher } from '../redux/reducer/authSlice'
import { useNavigation } from '@react-navigation/native'

const ExtraDetailsScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const role = useSelector(state => state.session.user.role)
    const isGeneralFormComplete = useSelector(state => state.signUpInfo.isGeneralFormComplete)
    const [isTeacher, setIsTeacher] = useState(false)
    const [isParent, setIsParent] = useState(false)

    useEffect(() => {
        if (role === 'teacher' && isGeneralFormComplete) setIsTeacher(true)
        if (role === 'parent' && isGeneralFormComplete) setIsParent(true)
    }, [isGeneralFormComplete])
    useEffect(() => {
        // TESTING ONLY
        // dispatch(testTeacher())
        // dispatch(testTeacherSesh())
        // TESTING ONLY
        // dispatch(testParent())
        // dispatch(testParentSesh())

        navigation.setOptions({ gestureEnabled: false })
    }, [])

    return (
        <ContainerExtraDetails>
            <View style={ styles.container }>
                <TopHeading title='Extra Details' subtitle={`for ${role}s`} />
                { !isGeneralFormComplete && <FormGeneral /> }
                { isTeacher && <FormTeacher /> }
                { isParent && <FormParent /> }
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