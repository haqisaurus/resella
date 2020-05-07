import { appConfig } from '../configs/configs';
import { store } from '../redux-storage/configureStore';
import { IResponse } from '../typed/Common';
import { IProduct } from '../typed/Entity';
import * as qs from 'qs';
export function getProducts (pagination: any): Promise<IResponse> {
    const state = store.getState();
    const query = qs.stringify({
        page: pagination.current,
        size: pagination.pageSize
    });
    return fetch(appConfig.productServiceUrl + '/api/v1/product?' + query, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: IProduct = await res.json();
        return { header: res, data };
    });
}