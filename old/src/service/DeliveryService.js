import { appConfig } from './../configs/configs';

export const getProvice = () => {
    return fetch(appConfig.apiUrl + '/api/v1/province', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.token
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}
export const getCities = (province_id) => {
    return fetch(appConfig.apiUrl + '/api/v1/city/' + province_id, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.token
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}
export const getSubdistrict = (city_id) => {
    return fetch(appConfig.apiUrl + '/api/v1/subdistrict/' + city_id, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.token
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}