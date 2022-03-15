import * as Types from './../Constants'

const initialUser = {
    user: {},
    isOnline: false,
    userInfoId: ''
}

const userReducer = (state = initialUser, action) => {
    switch (action.type) {
        case Types.SIGN_UP:
            return {
                ...state,
                user: action.user,
                isOnline: true
            }
        case Types.SIGN_OUT:
            return {
                ...state,
                user: action.user,
                isOnline: false
            }
        case Types.GET_USER_ID:
            return {
                ...state,
                isOnline: true,
                userInfoId: action.id
            }
        default:
            return state
    }

}

export default userReducer;