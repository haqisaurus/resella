import { appConfig } from '../configs/configs';
import { objectToQueryString } from '../../old/src/util/Helper'
import { store } from '../redux-storage/configureStore';

export const getCategory = (params: any) => {
    const query = objectToQueryString(params);
    return fetch(appConfig.apiUrl + '/api/users?' + query, {

    }).then(async res => {
        const data = await res.json();
        return { header: res, data };
    });
}
