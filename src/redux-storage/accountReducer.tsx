export interface IAcccount {
    token: string;
    tokenStore: string;
    expiredAt: number;
    profile: any;
}
const INITIAL_STATE : IAcccount = {
    token: '',
    tokenStore: '',
    expiredAt: 0,
    profile: null
};

export function accountReducer (state: IAcccount = INITIAL_STATE, action: any): IAcccount {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload.token,
                expiredAt: action.payload.expiredAt
            };
        case 'SET_TOKEN_STORE':
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
            return {...INITIAL_STATE};
        }
        default:
            return state;
    }
};
