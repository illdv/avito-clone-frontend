import {
	AdSelectedFields, AdWithFields, AdAppendsFields, IGetAdForShowPageRequest,
	IGetAdsForIndexPageRequest
} from '../api/gInterface';

export const getDataForAdsIndexPage: IGetAdsForIndexPageRequest = {
		fields: [
			AdSelectedFields.id,
			AdSelectedFields.title,
			AdSelectedFields.description,
			AdSelectedFields.price,
			AdSelectedFields.updated_at,
		],
		with: [
			AdWithFields.images,
		],
};

export const getDataForAdShowPage: IGetAdForShowPageRequest = {
	fields: [
		AdSelectedFields.id,
		AdSelectedFields.title,
		AdSelectedFields.description,
		AdSelectedFields.body,
		AdSelectedFields.price,
		AdSelectedFields.updated_at,
		AdSelectedFields.created_at,
		AdSelectedFields.phone,
		AdSelectedFields.address,
	],
	with: [
		AdWithFields.seller,
		AdWithFields.options,
		AdWithFields.country,
		AdWithFields.images,
		AdWithFields.priceHistory
	],
	appends: [
		AdAppendsFields.today_visits,
		AdAppendsFields.total_visits,
		AdAppendsFields.next_ad,
	],
};