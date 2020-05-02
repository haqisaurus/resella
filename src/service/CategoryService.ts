import { appConfig } from '../configs/configs';
import { store } from '../redux-storage/configureStore';
import { IResponse } from '../typed/Common';
import { ICategory } from '../typed/Entity';

export function getCategory (): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.productServiceUrl + '/api/v1/category', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: ICategory = await res.json();
        return { header: res, data };
    });
}
export const getDetailCategory = (categoryId: number) => {
    const state = store.getState();
    return fetch(appConfig.productServiceUrl + '/api/v1/category/' + categoryId, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}
export function createCategory (values: ICategory): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.productServiceUrl + '/api/v1/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data: ICategory = await res.json();
        return { header: res, data };
    });
}
export function updateCategory (values: ICategory): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.productServiceUrl + '/api/v1/category/' + values.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data: ICategory = await res.json();
        return { header: res, data };
    });
}
export function deleteCategory (values: ICategory): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.productServiceUrl + '/api/v1/category/' + values.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: ICategory = await res.json();
        return { header: res, data };
    });
}