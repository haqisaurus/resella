const INITIAL_STATE = {
    token: null,
    tokenStore: null,
    expiredAt: null,
    profile: null
};

export const accountReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            console.log(action)
            return {
                ...state,
                token: action.payload.token,
                expiredAt: action.payload.expiredAt
            };
        case 'SET_TOKEN_STORE':
            console.log(action)
            return {
                ...state,
                tokenStore: action.payload.token,
                expiredAt: action.payload.expiredAt
            };
        case 'SET_PROFILE': 
            return {
                ...state,
                profile: action.payload
            }
        case 'LOGOUT': {
            window.token = null;
            window.tokenStore = null;
            return {
                token: null,
                tokenStore: null,
                expiredAt: null,
                profile: null
            };
        }
        default:
            return state;
    }
};
