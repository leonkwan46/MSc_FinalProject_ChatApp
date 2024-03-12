import { useSelector } from 'react-redux'

const getRegisteringUser = () => {
    return useSelector(state => state.auth.user)
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


const getChatRoomInfo = () => {
    return useSelector(state => state.session.currentChatRoom)
}

export {
    getRegisteringUser,
    getLoggedInUser,
    getUserContacts,
    getPreSelectedContact,
    getUserRole,
    getUserID,
    getUserToken,
    getChatRoomInfo,
}