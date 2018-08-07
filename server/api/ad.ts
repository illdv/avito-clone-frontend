import {
	AdAppendsFields, AdSelectedFields, AdWithFields, IGetFullAdsRequest,
	IGetLiteAdsRequest
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

// export const resDataForAdShowPage: IGetFullAdsResponse = {
// 	[AdWithFields.seller],
// 	[AdWithFields.options],
// 	[AdWithFields.country],
// 	[AdWithFields.images],
// 	[AdWithFields.priceHistories],
// 	[AdAppendsFields.today_visits],
// 	[AdAppendsFields.total_visits],
// 	[AdAppendsFields.next_ad],
// 	[AdSelectedFields.id],
// 	[AdSelectedFields.category_id],
// 	[AdSelectedFields.user_id],
// 	[AdSelectedFields.created_at],
// 	[AdSelectedFields.price],
// 	[AdSelectedFields.description],
// 	[AdSelectedFields.title],
// 	[AdSelectedFields.address],
// 	[AdSelectedFields.body],
// 	[AdSelectedFields.city_id],
// 	[AdSelectedFields.deleted_at],
// 	[AdSelectedFields.is_active],
// 	[AdSelectedFields.is_approved],
// 	[AdSelectedFields.is_published],
// 	[AdSelectedFields.is_vip],
// 	[AdSelectedFields.latitude],
// 	[AdSelectedFields.longitude],
// 	[AdSelectedFields.phone],
// 	[AdSelectedFields.updated_at],
// };