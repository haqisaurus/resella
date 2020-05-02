import { appConfig } from '../configs/configs';
import { store } from '../redux-storage/configureStore';
import { IResponse } from '../typed/Common';
import { IAddress } from '../typed/Entity';

export function getAddress (): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/address', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: IAddress[] = await res.json();
        return { header: res, data };
    });
}
export function createAddress (values: IAddress): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/address', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data: IAddress = await res.json();
        return { header: res, data };
    });
}
export function updateAddress(values: IAddress): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/address/' + values.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data: IAddress = await res.json();
        return { header: res, data };
    });
}
export function deleteAddress(values: IAddress): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.accountServiceUrl + '/api/v1/address/' + values.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: IAddress = await res.json();
        return { header: res, data };
    });
}