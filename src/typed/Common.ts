export interface IResLogin {
    expiredAt: number;
    token: string;
}
export interface IAddress {
    address: string;
    city: string;
    city_id: number;
    created_at: Date;
    id: number;
    is_default: boolean;
    latitude: string;
    longitude: string;
    name: string;
    postalcode: number;
    province: string;
    province_id: number;
    store_id: number;
    subdistrict: string;
    subdistrict_id: number;
    updated_at: Date;
    user_id: number;
}
export interface IBank {
    id: number;
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
export interface IDelivery {
    service: string;
    group_service: string;
    active: boolean;
    created_at: Date;
    id: number;
    store_id: number;
    updated_at: Date;
}
export interface IStore {
    addresses?: IAddress[];
    banks?: IBank[];
    couriers?: IDelivery[];
    created_at: Date;
    deleted_at: Date;
    delivery_support: boolean;
    desc: string;
    id: number;
    logo: string;
    name: string;
    phone: string;
    rate: number;
    status: string;
    updated_at: Date;
    user_id: number;
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

export interface IProfile {
    activation_code: string;
    created_at: Date;
    email: string;
    facebook: boolean;
    facebook_id: number;
    google: boolean;
    google_id: number;
    id: number;
    name: string;
    password: any
    phone: string;
    photo: string;
    status: string;
    updated_at: Date;
}