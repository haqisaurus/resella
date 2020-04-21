const INITIAL_STATE = {
    currentStore: null
};

export const storeReducer = (state = INITIAL_STATE, action) => {
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
