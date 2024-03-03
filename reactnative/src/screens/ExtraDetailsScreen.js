import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import ContainerExtraDetails from '../components/extraDetails/ContainerExtraDetails'
import TopHeading from '../components/SharedComponents/TopHeading'
import FormGeneral from '../components/extraDetails/FormGeneral'
import FormTeacher from '../components/extraDetails/FormTeacher'
import FormParent from '../components/extraDetails/FormParent'

const ExtraDetailsScreen = () => {
    const { role, isInvited, isGeneralFormComplete } = useSelector(state => state.auth.user)
    const shouldSkipGeneralForm = isGeneralFormComplete && isInvited

    const [isTeacher, setIsTeacher] = useState(false)
    const [isParent, setIsParent] = useState(false)

    useEffect(() => {
        if (role === 'teacher' && isGeneralFormComplete) setIsTeacher(true)
        if (role === 'parent' && isGeneralFormComplete) setIsParent(true)
    }, [isGeneralFormComplete])
    console.log('isInvited', isInvited)
    console.log('shouldSkipGeneralForm', shouldSkipGeneralForm)
    console.log('isGeneralFormComplete', isGeneralFormComplete)
    return (
        <ContainerExtraDetails>
            <View style={ styles.container }>
                <TopHeading title='Extra Details' subtitle={`for ${role}s`} />
                { (!isGeneralFormComplete || !shouldSkipGeneralForm) && <FormGeneral /> }
                { (isTeacher || isTeacher&&shouldSkipGeneralForm) && <FormTeacher /> }
                { (isParent || isParent&&shouldSkipGeneralForm) && <FormParent /> }
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