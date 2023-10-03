import ContainerLoginSignup from '../SharedComponents/loginSignup/ContainerLoginSignup'
import { Text } from 'react-native'

const ExtraDetailsScreen = () => {

    const role = useSelector((state) => state.signUpInfo.role)

    return (
        <ContainerLoginSignup>
            
        </ContainerLoginSignup>
    )
}

export default ExtraDetailsScreen