import { appConfig } from './../configs/configs';

export const getMyStore = () => {
    return fetch(appConfig.apiUrl + '/api/v1/store', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.token
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}

export const postNewStore = (values) => {
    return fetch(appConfig.apiUrl + '/api/v1/store', {
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
export const getCurrentStore = (values) => {
    return fetch(appConfig.apiUrl + '/api/v1/detail-store', {
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
