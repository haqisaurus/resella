import { appConfig } from '../configs/configs';
import { store } from '../redux-storage/configureStore';

export const myProfile = () => {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/me', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}

export const updateProfile = (values: any) => {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}