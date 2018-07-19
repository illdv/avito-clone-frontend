export interface IAd {
    ad: {
        id: string;
        title: string;
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
    };
    categories: ICategories;
}
export interface ICategories {
    categories: object;
}

export interface ISeller {
    user: {
        phone: string;
        name: string;
        created_at: string;
    }
}

export interface IImage {
    images: object;
}

export interface IVehicleFeature {
    options:object;
}
