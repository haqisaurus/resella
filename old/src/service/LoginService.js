import { appConfig } from './../configs/configs';

export const postLogin = (values) => {
    return fetch(appConfig.apiUrl + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data = await res.json();
        return { header: res, data }
    });
}

export const postLoginStore = (values) => {
    return fetch(appConfig.apiUrl + '/login-store', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.token
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}

export const verifyToken = () => {
    return fetch(appConfig.apiUrl + '/verify', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.token
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}

export const verifyTokenStore = () => {
    return fetch(appConfig.apiUrl + '/verify-store', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.tokenStore
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}
