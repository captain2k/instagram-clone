import { combineReducers } from "redux";
import userReducer from "./user";
import postReducer from "./post";


const rootReducer = combineReducers({
    userReducer,
    postReducer
})

export default rootReducer;