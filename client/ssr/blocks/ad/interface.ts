import { IOption, IType } from 'client/common/entities/user/modules/owned-ads/interfaces';

export interface IAdCity {
	area: string;
	city_id: number;
	country_id: number;
	region_id: number;
	title?: string|null;
	country: IAdCountry;
}

export interface IAdCountry {
	country_id: number;
	title: string;
	total_ads: number;
	region_id?: number;
}

export interface IAd {
	id: number;
	title: string;
	next_ad: number;
	created_at: string;
	updated_at: string;
	total_visits: number;
	today_visits: number;
	is_favorite: boolean;
	address: string;
	images: IImage[];
	price_histories: IPriceHistories[];
	body: string;
	description: string;
	price: number;
	options: IOption[];
	type: IType;
	user: ISeller;
	category_id: number;
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
			pointBorderColor: string[];
			pointBackgroundColor: string;
		}];
	};
}

export interface IPriceHistories {
	ad_id: number;
	date_time: string;
	value: number;
}
export interface ISimilarAdsState {
	similar_ads?: ISimilarFieldsProps[];
	filter?: string;
}

export interface ICrumb {
	title: string;
	href: string;
}

export interface IFeatureAdProps {
	options: IOption[];
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
	coordinatesMap: {
		lat: number;
		lng: number;
	};
	isFavorite: boolean;
}

export interface ISliderProps {
	images: IImage[];
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

export interface IDescription {
	body: string;
}

export interface ISimilarFieldsProps {
	id: number;
	title: string;
	price: string;
	userName: string;
	description: string;
	images: IImage[];
}
export interface ISimilarAdProps {
	similar_ad: ISimilarFieldsProps;
}

export interface ISimilarAdsProps {
	filter?: string;
	similar_ads: ISimilarFieldsProps[];
	id_parent: number;
}

export interface IChart {
	similar_ads: ISimilarFieldsProps[];
	id_parent: number;
	price_histories: IPriceHistories[];

}

export interface IFavorites {
	id: number;
	selectFavorite: (id: number) => void;
	isFavorite: boolean;
}

export interface IGMProps {
	city: IAdCity;
	address?: string;
	coordinatesMap: IGMMarkerProp;

}

export interface ILocationSale {
	coordinatesMap: IGMMarkerProp;
	zoom: number;
}

export interface IGMState {
	zoom?: number;
	show?: boolean;
}

export interface IGMMarkerProp {
	lat: number;
	lng: number;
}