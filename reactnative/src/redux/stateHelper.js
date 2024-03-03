import { useSelector } from 'react-redux'

const getRegisteringUser = () => {
    return useSelector(state => state.auth.user)
}

const getLoggedInUser = () => {
    return useSelector(state => state.session.user)
}

export { getRegisteringUser, getLoggedInUser }