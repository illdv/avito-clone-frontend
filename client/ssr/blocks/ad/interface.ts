export  interface  IAdCity {
    name: string;
}

export interface IAd {
    id: string;
    title: string;
    next_ad: string;
    created_at: string;
    updated_at: string;
    total_visits: string;
    today_visits: string;
    images: IImage;
    body: string;
    description: string;
    price: string;
    options: IVehicleFeature;
    type: object;
    user: ISeller;
    category_id: string;
    city: IAdCity;
}

export interface ICrumb {
    name: string;
    href: string;
}

export interface IAdsProps {
    ad: IAd;
    categories: any[];
}

export interface IAdsState {
    crumbs: ICrumb[]
    lastCrumb: ICrumb
}

export interface ISeller {
    phone: string;
    name: string;
    created_at: string;
}

export  interface ISellerProps {
    seller: ISeller;
}

export interface IImage {
    images: object;
}

export interface IVehicleFeature {
    options:object;
}
