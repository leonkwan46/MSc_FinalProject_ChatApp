import ContainerLoginSignup from '../components/SharedComponents/loginSignup/ContainerLoginSignup'
import { Text } from 'react-native'

const ExtraDetailsScreen = () => {

    const role = useSelector((state) => state.signUpInfo.role)

    return (
        <ContainerLoginSignup>
            <Text>
                AUHDSIUDNISUbfd
            </Text>
        </ContainerLoginSignup>
    )
}

export default ExtraDetailsScreen