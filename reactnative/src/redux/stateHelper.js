import { useSelector } from 'react-redux'

const getUser = () => {
    const authUser = useSelector((state) => state.auth.user)
    const sessionUser = useSelector((state) => state.session.user)
    return authUser || sessionUser
}

export { getUser }