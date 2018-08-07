export enum AdAppendsFields {
	total_visits = 'total_visits',
	today_visits = 'today_visits',
	next_ad = 'next_ad',
}

export enum AdSelectedFields {
	id = 'id',
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
	priceHistory = 'priceHistory',
	city = 'city',
}

export interface IGetAdsForIndexPageRequest {
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

export interface IGetAdForShowPageRequest {
	with: [
		AdWithFields.seller,
		AdWithFields.options,
		AdWithFields.country,
		AdWithFields.images,
		AdWithFields.priceHistory
		];
	fields: [
		AdSelectedFields.id,
		AdSelectedFields.title,
		AdSelectedFields.description,
		AdSelectedFields.body,
		AdSelectedFields.price,
		AdSelectedFields.updated_at,
		AdSelectedFields.created_at,
		AdSelectedFields.phone,
		AdSelectedFields.address
		];
	appends: [
		AdAppendsFields.today_visits,
		AdAppendsFields.total_visits,
		AdAppendsFields.next_ad
	];

}
