import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ContainerExtraDetails from '../components/extraDetails/ContainerExtraDetails'
import TopHeading from '../components/SharedComponents/TopHeading'
import FormGeneral from '../components/extraDetails/FormGeneral'
import FormTeacher from '../components/extraDetails/FormTeacher'
import FormParent from '../components/extraDetails/FormParent'
import { useNavigation } from '@react-navigation/native'
import { setUser } from '../redux/reducer/sessionSlice'
import { clearAuthStates } from '../redux/reducer/authSlice'

const ExtraDetailsScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const { role, isGeneralFormComplete, isInvited, isInvitationVerified, isDocVerified } = user

    const [isTeacher, setIsTeacher] = useState(false)
    const [isParent, setIsParent] = useState(false)

    const shouldSkipGeneralForm = isParent && isGeneralFormComplete && isInvited
    const isFullFormComplete = isGeneralFormComplete && (isTeacher && isDocVerified || isParent && isInvitationVerified)

    useEffect(() => {
        if (role === 'teacher' && isGeneralFormComplete) setIsTeacher(true)
        if (role === 'parent' && isGeneralFormComplete) setIsParent(true)
    }, [isGeneralFormComplete])

    useEffect(() => {
        if (isFullFormComplete) {
            dispatch(setUser(user))
            dispatch(clearAuthStates())
            navigation.navigate('LoggedInTabs')
        }
    }, [isFullFormComplete])

    return (
        <ContainerExtraDetails>
            <View style={ styles.container }>
                <TopHeading title='Extra Details' subtitle={`for ${role}s`} />
                { (!isGeneralFormComplete) && <FormGeneral /> }
                { (isTeacher) && <FormTeacher /> }
                { (isParent || shouldSkipGeneralForm) && <FormParent /> }
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