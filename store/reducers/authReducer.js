import { SET_ERROR, SET_LOADING, SET_SUCCESS, SET_USER, NEED_VERIFICATION } from "../actions/authActions";

const initialState = {
    user: null,
    authenticated: false,
    needVerification: false,
    error: "",
    loading: false,
    success: false,
};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true,
            }
        case NEED_VERIFICATION:
            return {
                ...state,
                needVerification: true
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;