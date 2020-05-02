import { appConfig } from '../configs/configs';
import { store } from '../redux-storage/configureStore';
import { IReqLogin, IResLogin } from '../typed/Common';
export const postLogin = (values: IReqLogin) => {
    return fetch(appConfig.accountServiceUrl + '/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    }).then(async (res: any) => {
        const data: IResLogin = await res.json();
        return { header: res, data }
    });
}

export const postLoginStore = (values: any) => {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/login-store', {
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

export const verifyToken = () => {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/verify', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.token
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}

export const verifyTokenStore = () => {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/verify-store', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}
