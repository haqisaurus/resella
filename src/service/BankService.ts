import { appConfig } from '../configs/configs';
import { store } from '../redux-storage/configureStore';
import { IReqBank } from '../typed/Request';
import { IResBank, IResBankType } from '../typed/Response';
import { IResponse } from '../typed/Common';

export function getBankOptions (): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.apiUrl + '/api/v1/bank-type', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: IResBankType[] = await res.json();
        return { header: res, data };
    });
}
export function getBank (): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.apiUrl + '/api/v1/bank', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: IResBank[] = await res.json();
        return { header: res, data };
    });
}
export function createBank (values: IReqBank): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.apiUrl + '/api/v1/bank', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data: IResBank = await res.json();
        return { header: res, data };
    });
}
export function updateBank(values: IReqBank): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.apiUrl + '/api/v1/bank/' + values.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
        body: JSON.stringify(values)
    }).then(async res => {
        const data: IResBank = await res.json();
        return { header: res, data };
    });
}
export function deleteBank(values: IReqBank): Promise<IResponse> {
    const state = store.getState();
    return fetch(appConfig.apiUrl + '/api/v1/bank/' + values.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.account.tokenStore
        },
    }).then(async res => {
        const data: IResBank = await res.json();
        return { header: res, data };
    });
}