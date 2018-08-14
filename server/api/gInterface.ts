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
	is_completed = 'is_completed',
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
export interface IGetSellerAdRequest {
	appends: [
		AdAppendsFields.total_visits
	];
	with: [
		AdWithFields.images,
		AdWithFields.options
	];
}

export enum CategoryAppendsFields {
	total_ads_count = 'total_ads_count',
	total_options = 'total_options',
	ads_count = 'ads_count',
	children = 'children',
}

export enum CategorySelectedFields {
	id = 'id',
	title = 'title',
	slug = 'slug',
	parent_id = 'parent_id',
	description = 'description',
}

export enum CategoryWithFields {
	parent = 'parent',
	options = 'options',
	ads = 'ads',
	images = 'images',
}

export interface IGetLiteCategoriesRequest {
	fields: [
		CategorySelectedFields.id,
		CategorySelectedFields.title,
		CategorySelectedFields.parent_id,
		CategorySelectedFields.slug
	];
	appends: [
		CategoryAppendsFields.total_ads_count,
		CategoryAppendsFields.children,
		CategoryAppendsFields.total_options,
		CategoryAppendsFields.ads_count
	];
	with: [
		CategoryWithFields.options
	];
}