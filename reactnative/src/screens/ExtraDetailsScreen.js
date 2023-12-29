import { useDispatch } from 'react-redux'
import ContainerLoginSignup from '../components/SharedComponents/loginSignup/ContainerLoginSignup'
import { Text } from 'react-native'
import { useEffect } from 'react'

const ExtraDetailsScreen = () => {
    const dispatch = useDispatch()
    const role = useSelector((state) => state.signUpInfo.role)

    useEffect(() => {
        dispatch(setCurrentScreen({ title: 'EXTRADETAILS' }))
    }, [])
    return (
        <ContainerLoginSignup>
            <Text>
                AUHDSIUDNISUbfd
            </Text>
        </ContainerLoginSignup>
    )
}

export default ExtraDetailsScreen