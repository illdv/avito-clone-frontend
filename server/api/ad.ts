import { AdSelectedFields, AdWithFields, IGetAdsForIndexPageRequest } from '../api/gInterface';

export const getDataForAdsIndexPage: IGetAdsForIndexPageRequest = {
		fields: [
			AdSelectedFields.id,
			AdSelectedFields.title,
			AdSelectedFields.description,
			AdSelectedFields.price,
			AdSelectedFields.created_at,
		],
		with: [AdWithFields.images],
};