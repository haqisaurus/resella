import { appConfig } from '../configs/configs';
import { store } from '../redux-storage/configureStore';
import { IResponse } from '../typed/Common';
import { ISupplier } from '../typed/Entity';

export function getSupplier (): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.productServiceUrl + '/api/v1/supplier', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: ISupplier = await res.json();
        return { header: res, data };
    });
}
export const getDetailSupplier = (supplierId: number) => {
    const state = store.getState();
    return fetch(appConfig.productServiceUrl + '/api/v1/supplier/' + supplierId, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}
export function createSupplier (values: ISupplier): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.productServiceUrl + '/api/v1/supplier', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data: ISupplier = await res.json();
        return { header: res, data };
    });
}
export function updateSupplier (values: ISupplier): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.productServiceUrl + '/api/v1/supplier/' + values.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data: ISupplier = await res.json();
        return { header: res, data };
    });
}
export function deleteSupplier (values: ISupplier): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.productServiceUrl + '/api/v1/supplier/' + values.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: ISupplier = await res.json();
        return { header: res, data };
    });
}