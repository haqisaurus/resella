export interface IStore {
    breadcrumbs: any[];
}
const INITIAL_STATE = {
    breadcrumbs: []
};

export function systemReducer (state = INITIAL_STATE, action: any): IStore {
    switch (action.type) {
        case 'SET_BREADCRUM':
            // console.log(action.payload)
            return {
                ...state,
                breadcrumbs: action.payload
            };
        default:
            return state;
    }
};
