import { appConfig } from '../configs/configs';
import { store } from '../redux-storage/configureStore';
import { IReqAddress } from '../typed/Request';
import { IResAddress } from '../typed/Response';
import { IResponse } from '../typed/Common';

export function getAddress (): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.apiUrl + '/api/v1/address', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: IResAddress[] = await res.json();
        return { header: res, data };
    });
}
export function createAddress (values: IReqAddress): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.apiUrl + '/api/v1/address', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data: IResAddress = await res.json();
        return { header: res, data };
    });
}
export function updateAddress(values: IReqAddress): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.apiUrl + '/api/v1/address/' + values.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data: IResAddress = await res.json();
        return { header: res, data };
    });
}
export function deleteAddress(values: IReqAddress): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.apiUrl + '/api/v1/address/' + values.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: IResAddress = await res.json();
        return { header: res, data };
    });
}