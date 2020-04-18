import { appConfig } from './../configs/configs';

export const myProfile = () => {
    return fetch(appConfig.apiUrl + '/api/v1/me', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.token
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}

export const updateProfile = (values) => {
    return fetch(appConfig.apiUrl + '/api/v1/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}