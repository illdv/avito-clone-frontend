import { IAdCity, IProductHistories, ISeller } from 'client/ssr/blocks/ad/interface';

export enum AdAppendsFields {
	total_visits = 'total_visits',
	today_visits = 'today_visits',
	next_ad = 'next_ad',
}

export enum AdSelectedFields {
	id = 'id',
	user_id = 'user_id',
	category_id = 'category_id',
	city_id = 'city_id',
	title = 'title',
	price = 'price',
	description = 'description',
	body = 'body',
	is_published = 'is_published',
	is_approved = 'is_approved',
	is_active = 'is_active',
	is_vip = 'is_vip',
	created_at = 'created_at',
	updated_at = 'updated_at',
 	deleted_at = 'deleted_at',
	latitude = 'latitude',
	longitude = 'longitude',
	phone = 'phone',
	address = 'address',
}

export enum  AdWithFields {
	country = 'city.country',
	seller = 'user',
	images = 'images',
	options = 'options',
	priceHistories = 'priceHistories',
	city = 'city',
}

export interface IGetLiteAdsRequest {
	fields: [
		AdSelectedFields.id,
		AdSelectedFields.title,
		AdSelectedFields.description,
		AdSelectedFields.price,
		AdSelectedFields.updated_at
	];
	with: [
		AdWithFields.images
	];
}

export interface IGetFullAdsRequest {
	with: [
		AdWithFields.seller,
		AdWithFields.options,
		AdWithFields.country,
		AdWithFields.images,
		AdWithFields.priceHistories
	];
	appends: [
		AdAppendsFields.today_visits,
		AdAppendsFields.total_visits,
		AdAppendsFields.next_ad
	];

}


export interface IGetFullAdsResponse {
	[AdWithFields.seller]: ISeller;
	[AdWithFields.options]: any[];
	[AdWithFields.country]: IAdCity;
	[AdWithFields.images]: IImage[];
	[AdWithFields.priceHistories]: IProductHistories[];
	[AdAppendsFields.today_visits]: string;
	[AdAppendsFields.total_visits]: string;
	[AdAppendsFields.next_ad]: number;

}