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

export interface IReqAddress {
    id?:number;
    name: string;
    address: string;
    province: string;
    province_id: number;
    city: string;
    city_id: number;
    subdistrict: string;
    subdistrict_id: number;
    postalcode: number;
    longitude?: string;
    latitude?: string;
    is_default: boolean;
    user_id?: number;
    store_id?: number;
}
export interface IReqBank {
    id?:number;
    name: string;
    code: string;
    type: string;
    account_number: string;
    account_name: string;
    user_id: number;
    store_id: number;
    is_default: boolean;
    updated_at: Date;
    created_at: Date;
}