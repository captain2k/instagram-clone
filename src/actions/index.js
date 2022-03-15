import * as Types from './../Constants'

// Users
export const signUp = (user) => {
    return {
        type: Types.SIGN_UP,
        user
    }
}

export const signOut = (user) => {
    return {
        type: Types.SIGN_OUT,
        user
    }
}

export const getUserId = (id) => {
    return {
        type: Types.GET_USER_ID,
        id
    }
}

// Posts
export const uploadPost = (post) => {
    return {
        type: Types.UPLOAD_POST,
        post
    }
}