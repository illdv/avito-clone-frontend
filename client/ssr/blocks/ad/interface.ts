export interface IAdCity {
	title?: string|null;
	country: IAdCountry;
}

export interface IAdCountry {
	title: string;
}

export interface IAd {
	id: number;
	title: string;
	next_ad: string;
	created_at: string;
	updated_at: string;
	total_visits: string;
	today_visits: string;
	is_favorite: boolean;
	address: string;
	images: any[];
	price_histories: IProductHistories[];
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

export interface IChartState {
	data: {
		labels: string[];
		datasets: [{
			data: number[];
			label: string;
			backgroundColor: string[];
			borderColor: string[];
			borderWidth: number;
		}];
	};
	options?: {};
}

export interface IProductHistories {
	ad_id: number;
	date_time: string;
	value: number;
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
	user: IUserState;
}

export interface IAdsState {
	crumbs: ICrumb[];
	lastCrumb: ICrumb;
	images: IImage[];
	default_map: {
		lat: number;
		lng: number;
	};
	isFavorite: boolean;
}

export interface ISliderProps {
	images: IImage[];
}

export interface ISlide {
	original: string;
	thumbnail: string;
}

export interface ISeller {
	id: number;
	email: string;
	phone: string;
	name: string;
	created_at: string;
	completed_ad: number;
	image: IImage;
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

export interface ISimilarRandomProps {
	id?: string|null;
	title: string;
	price: string;
	userName: string;
	description: string;
	image: {
		file_url: string;
	};
}

export interface ISimilarRandomState {
	description: string;
	title: string;
	similar_ad: ISimilarAd;
}

export interface ISimilarProps {
	filter?: string;
	similar_ads: any[];
	id_parent: number;
}

export interface IChart {
	similar_ads: any[];
	id_parent: number;
	price_histories: IProductHistories[];

}

export interface IFavorites {
	id: number;
	selectFavorite: (id: number) => void;
	isFavorite: boolean;
}

export interface IFavoriteState {
	is_favorite: boolean;
}

export interface ISimilarAd {
	id: number;
	title: string;
	images: any[];
	description: string;
	price: string;
	user: ISeller;

}

export interface IGMProps {
	address: string;
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