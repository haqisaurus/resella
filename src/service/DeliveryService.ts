import { appConfig } from '../configs/configs';
import { store } from '../redux-storage/configureStore';

export const getDeliveryServices = () => {
    const state = store.getState();
    return fetch(appConfig.apiUrl + '/api/v1/delivery-service', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.token
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}
export const getProvice = () => {
    const state = store.getState();
    return fetch(appConfig.apiUrl + '/api/v1/province', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.token
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}
export const getCities = (province_id: number) => {
    const state = store.getState();
    return fetch(appConfig.apiUrl + '/api/v1/city/' + province_id, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.token
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}
export const getSubdistrict = (city_id: number) => {
    const state = store.getState();
    return fetch(appConfig.apiUrl + '/api/v1/subdistrict/' + city_id, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.token
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}