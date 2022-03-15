import * as Types from './../Constants'


const initialPost = {
    posts: {}
};

const postReducer = (state = initialPost, action) => {
    switch (action.type) {
        case Types.UPLOAD_POST:
            return {
                ...state,
                posts: action.post
            }
        default:
            return state
    }
}

export default postReducer;