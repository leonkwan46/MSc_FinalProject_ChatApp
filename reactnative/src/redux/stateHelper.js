import { useSelector } from 'react-redux'

const getUser = () => {
    const authUser = useSelector(state => state.auth.user)
    const sessionUser = useSelector(state => state.session.user)
    return authUser || sessionUser
}

const getLoggedInUser = () => {
    const user = useSelector(state => state.session.user)
    return user
}

export { getUser, getLoggedInUser }