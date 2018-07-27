import { IUserActions } from 'client/common/user/actions';

export interface IAdCity {
	title?: string|null;
	country: IAdCountry;
}

export interface IAdCountry {
	title: string;
}

export interface IAd {
	id: string;
	title: string;
	next_ad: string;
	created_at: string;
	updated_at: string;
	total_visits: string;
	today_visits: string;
	is_favorite: boolean;
	images: any[];
	body: string;
	description: string;
	price: string;
	options: IVehicleFeature;
	type: object;
	similar_ad: ISimilarAd;
	user: ISeller;
	category_id: string;
	city: IAdCity;
	latitude: number;
	longitude: number;
}
export interface ISimilarSortState {
	similar_ad?: any[];
	filter?: string;
}

export interface ICrumb {
	title: string;
	href: string;
}

export interface IAdsProps {
	ad: IAd;
	categories: any[];
	similar: any[];
	userActions: IUserActions;
}

export interface IAdsState {
	crumbs: ICrumb[];
	lastCrumb: ICrumb;
	images: IImage[];
	default_map: {
		lat: number;
		lng: number;
	};
}

export interface ISliderProps {
	images: IImage[];
}

export interface IImage {
	original: string;
	thumbnail: string;
}

export interface ISeller {
	id: number;
	email: string;
	phone: string;
	name: string;
	created_at: string;
}

export interface ISellerProps {
	seller: ISeller;
	city: string;
	country: string;

}

export interface IVehicleFeature {
	options: object;
}

export interface IDescription {
	body: string;
}

export interface ISimilarProps {
	id?: string|null;
	title: string;
	price: string;
	userName: string;
	description: string;
	image: {
		file_url: string;
	};
}

export interface ISimilarState {
	description: string;
	title: string;
	similar_ad: ISimilarAd;
}

export interface ISimilar {
	filter?: string;
	similar_ad: any[];
	id_parent: string;
}

export interface IChart {
	similar_ads: any[];
	id_parent: string;

}

export interface IFavorites {
	id: string;
	selectFavorite: (id: string) => void;
}

export interface IFavoriteState {
	is_favorite: boolean;
}

export interface ISimilarAd {
	id: string;
	title: string;
	images: any[];
	description: string;
	price: string;
	user: ISeller;

}

export interface IGMProps {
	default_map: IGMMarkerProp;
	isMarkerShown: IGMMarkerProp;
	zoom?: number;
}

export interface IGMState {
	zoom?: number;
	show?: boolean;
}

export interface IGMMarkerProp {
	lat: number;
	lng: number;
}