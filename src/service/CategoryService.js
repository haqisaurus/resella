import { appConfig } from './../configs/configs';
import { objectToQueryString } from './../util/Helper'
export const getCategory = (params) => {
    const query = objectToQueryString(params);
    return fetch(appConfig.apiUrl + '/api/users?' + query, {

    }).then(async res => {
        const data = await res.json();
        return { res, data }
    });
}
