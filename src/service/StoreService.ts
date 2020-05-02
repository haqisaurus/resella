import { appConfig } from '../configs/configs';
import { store } from '../redux-storage/configureStore';

export const getMyStore = () => {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/store', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.token
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}

export const postNewStore = (values: any) => {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/store', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.token
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}
export const getCurrentStore = () => {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/detail-store', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}
export const updateStore = (values: any) => {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/store/' + values.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.token
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}
