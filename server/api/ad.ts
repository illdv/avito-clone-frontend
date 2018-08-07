import {
	AdSelectedFields, AdWithFields, AdAppendsFields, IGetLiteAdsRequest, IGetFullAdsRequest
} from '../api/gInterface';

export const getDataForAdsIndexPage: IGetLiteAdsRequest = {
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

export const getDataForAdShowPage: IGetFullAdsRequest = {
	with: [
		AdWithFields.seller,
		AdWithFields.options,
		AdWithFields.country,
		AdWithFields.images,
		AdWithFields.priceHistories,
	],
	appends: [
		AdAppendsFields.today_visits,
		AdAppendsFields.total_visits,
		AdAppendsFields.next_ad,
	],
};