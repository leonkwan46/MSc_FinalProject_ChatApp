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
import FormStudent from '../components/extraDetails/FormStudent'

const ExtraDetailsScreen = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const loggedInUser = useSelector(state => state.session.user)
    const { user, token } = useSelector(state => state.auth)
    const { role, isGeneralFormComplete, isInvited, isInvitationVerified, isDocVerified } = user

    const [isTeacher, setIsTeacher] = useState(false)
    const [isParent, setIsParent] = useState(false)

    const isStudentCreation = props.route?.params?.isStudent && loggedInUser.role === 'parent'
    const shouldSkipGeneralForm = isParent && isGeneralFormComplete && isInvited
    const isFullFormComplete = isGeneralFormComplete && (isTeacher && isDocVerified || isParent && isInvitationVerified)

    useEffect(() => {
        if (role === 'teacher' && isGeneralFormComplete) setIsTeacher(true)
        if (role === 'parent' && isGeneralFormComplete) setIsParent(true)
    }, [isGeneralFormComplete])

    useEffect(() => {
        if (isFullFormComplete) {
            dispatch(setUser({ user, token }))
            dispatch(clearAuthStates())
            navigation.navigate('LoggedInTabs')
        }
    }, [isFullFormComplete])

    return (
        <ContainerExtraDetails>
            <View style={ styles.container }>
                <TopHeading title={isStudentCreation ? 'Create Account' : 'Extra Details'} subtitle={isStudentCreation ? 'for student' : `for ${role}s`} />
                { (isStudentCreation) && <FormStudent /> }
                { (!isGeneralFormComplete && !isStudentCreation) && <FormGeneral /> }
                { (isTeacher) && <FormTeacher /> }
                { ((isParent || shouldSkipGeneralForm) && !isStudentCreation) && <FormParent /> }
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