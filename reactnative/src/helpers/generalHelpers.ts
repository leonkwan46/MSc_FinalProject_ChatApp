const TITLES = {
    HOME: 'Home',
    LOGIN: 'Login',
    REGISTER: 'Register',
    EXTRADETAILS: 'Extra Details',
    CONTACTS: 'Contacts',
    MESSAGES: 'Messages',
} as const

const SCREEN_NAMES = {
    HOME: 'HomeScreen',
    LOGIN_REGISTER: 'LoginSignUpScreen',
    EXTRA_DETAILS: 'ExtraDetailsScreen',
    CONTACT: 'ContactScreen',
    MESSAGE: 'MessageScreen',
    CHAT: 'ChatScreen',
} as const

const getTitleByScreenName = (screenName: string) => {
    switch (screenName) {
        case SCREEN_NAMES.HOME:
            return TITLES.HOME
        case SCREEN_NAMES.LOGIN_REGISTER:
            return TITLES.LOGIN
        case SCREEN_NAMES.EXTRA_DETAILS:
            return TITLES.EXTRADETAILS
        case SCREEN_NAMES.CONTACT:
            return TITLES.CONTACTS
        case SCREEN_NAMES.MESSAGE:
            return TITLES.MESSAGES
        default:
            return ''
    }
}

export { TITLES, SCREEN_NAMES, getTitleByScreenName }