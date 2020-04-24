export interface IStore {
    currentStore: any;
}
const INITIAL_STATE = {
    currentStore: null
};

export function storeReducer (state = INITIAL_STATE, action: any): IStore {
    switch (action.type) {
        case 'SET_STORE':
            return {
                ...state,
                currentStore: action.payload
            };
        default:
            return state;
    }
};
