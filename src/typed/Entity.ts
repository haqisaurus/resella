export interface ISupplier {
    id?: number;
    name: string;
    phone: string;
    desc: string;
    store_id?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface ICategory {
    id?: number;
    name: string;
    store_id?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface ITag {
    id?: number;
    name: string;
    product_id?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface IProduct {
    id?: number;
    name: string;
    sku: string;
    desc: string;
    is_secondhand: boolean;
    is_preorder: boolean;
    min_order: number;
    status: string;
    buy_price: number;
    rate: number;
    weight: number;
    store_id?: number;
    supplier_id?: number;
    category_id?: number;
    created_at?: Date;
    updated_at?: Date;
    supplier?: ISupplier;
    store?: IStore;
    tags?: ITag[];
    varians?: IVarian[];
    global_prices?: IPrice[],
    global_reseller_prices?: IPrice[],
}

export interface IVarian {
    id?: number;
    name: string;
    color: string;
    size: string;
    stock: number;
    product_id?: number;
    prices?: IPrice[];
    reseller_prices?: IPrice[];
    images?: IImage[];
    created_at?: Date;
    updated_at?: Date;
}

export interface IImage {
    id?: number;
    filename: string;
    link: string;
    varian_id?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface IPrice {
    id?: number;
    qty: number;
    price: number;
    type?: string;
    price_for?: string;
    created_at?: Date;
    updated_at?: Date;
}

// account service typed
export interface IAddress {
    id?: number;
    name: string;
    address: string;
    province: string;
    province_id: number;
    city: string;
    city_id: number;
    subdistrict: string;
    subdistrict_id: number;
    postalcode?: number;
    longitude?: string;
    latitude?: string;
    is_default: boolean;
    user_id: number;
    store_id: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface IBankType {
    typename: string;
    value: string;
    
}
export interface IBank {
    id?: number;
    name: string;
    code?: string;
    type: string;
    account_number: string;
    account_name: string;
    user_id?: number;
    store_id?: number;
    is_default?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface IDelivery {
    service: string;
    created_at: Date;
    id: number;
    store_id: number;
    updated_at: Date;
}

export interface IStore {
    addresses?: IAddress[];
    banks?: IBank[];
    deli_services?: IDelivery[];
    created_at?: Date;
    deleted_at?: Date;
    delivery_support?: boolean;
    desc?: string;
    id?: number;
    logo?: string;
    name: string;
    phone?: string;
    rate?: number;
    status?: string;
    updated_at?: Date;
    user_id?: number;
    imageBB?: string;
    slug?: string;
}

export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    photo: string;
    facebook: boolean;
    google: boolean;
    facebook_id: string;
    google_id: string;
    activation_code: string;
    status: string;
    created_at?: Date;
    updated_at?: Date;
}