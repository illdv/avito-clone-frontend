import {
	IGetLiteCategoriesRequest, CategoryAppendsFields, CategorySelectedFields,
	CategoryWithFields
} from '../api/gInterface';

export const getLitleCategories: IGetLiteCategoriesRequest = {
	fields: [
		CategorySelectedFields.id,
		CategorySelectedFields.title,
		CategorySelectedFields.parent_id,
		CategorySelectedFields.slug,
	],
	appends: [
		CategoryAppendsFields.total_ads_count,
		CategoryAppendsFields.children,
		CategoryAppendsFields.total_options,
	],
	with: [
		CategoryWithFields.options,
	],
};