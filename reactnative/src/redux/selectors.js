import { useSelector } from 'react-redux'

const getAuthUser = () => {
    return useSelector(state => state.auth.user)
}
const getAuthStatus = () => {
    return useSelector(state => state.auth.status)
}

const getLoggedInUser = () => {
    return useSelector(state => state.session.user)
}
const getUserContacts = () => {
    return useSelector(state => state.session.contacts)
}
const getPreSelectedContact = () => {
    return useSelector(state => state.session.preSelectedContact)
}
const getUserRole = () => {
    return useSelector(state => state.session.user.role)
}
const getUserToken = () => {
    return useSelector(state => state.session.user.token)
}
const getUserID = () => {
    return useSelector(state => state.session.user.id)
}
const getUserStatus = () => {
    return useSelector(state => state.session.status)
}


const getChatRoomInfo = () => {
    return useSelector(state => state.session.currentChatRoom)
}

const getRequestStatus = () => {
    const authStatus = getAuthStatus()
    const sessionStatus = getUserStatus()
    return { auth: authStatus, session: sessionStatus }
}

export {
    getAuthUser,
    getLoggedInUser,
    getUserContacts,
    getPreSelectedContact,
    getUserRole,
    getUserID,
    getUserToken,
    getChatRoomInfo,
    getRequestStatus,
    getAuthStatus,
    getUserStatus,
}