import { IProduct } from "./Entity";

export interface IResLogin {
    expiredAt: number;
    token: string;
}

export interface IProvince {
    province: string;
    province_id: number;
}
export interface ICity {
    city_name: string;
    city_id: number;
}
export interface ISubdistrict{
    subdistrict_name: string;
    subdistrict_id: number;
}
export interface ICreateStoreFormHelper {
    photo?: string;
    province?: IProvince | undefined;
    city?: ICity | undefined;
    subdistrict?: ISubdistrict | undefined;
}

export interface IResponse {
     header: Response; 
     data: any; 
}

export interface IReqLogin {
    authenticator: string;
    email: string;
    expiredAt: number;
    name: string;
    photo: string;
    refresh: string;
    token: string;
    userId: number;
}

export interface IReqLoginStore {
    storeId: number;
}
export interface IResLogin {
    expiredAt: number;
    token: string;
}

export interface IProductForm extends IProduct {
    auto_gen_code? : true;
}