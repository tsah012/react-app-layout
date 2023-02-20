import { LOGIN, LOGOUT, LOGGED_IN, LOGGED_OUT, LOGIN_FAILURE, LOGOUT_FAILURE } from "../actions/auth";

const initialState = {
    isLogged: false,
    isLoading: false,
    user: null,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN:
            return {
                isLogged: true,
                isLoading: false,
                user: action.payload,
                error: ''
            }
        case LOGGED_OUT:
            return {
                isLogged: false,
                isLoading: false,
                user: null,
                error: ''
            }
        case LOGIN:
            return {
                isLogged: false,
                isLoading: true,
                user: null,
                error: ''
            }
        case LOGOUT:
            return {
                isLogged: true,
                isLoading: true,
                user: action.payload,
                error: ''
            }
        case LOGOUT_FAILURE:
            return {
                isLogged: false,
                isLoading: false,
                user: null,
                error: action.payload
            }
        case LOGIN_FAILURE:
            return {
                isLogged: false,
                isLoading: false,
                user: null,
                error: action.payload
            }
        default:
            return { ...state }
    }
}

export default reducer;