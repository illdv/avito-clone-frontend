import { default as axios } from 'axios';
import * as queryString from 'query-string';

import {
	findCategoriesQueueBySlug,
	categoryQueueToBreadcrumbsFormat,
	getSubcategoryByCategoryQueue,
	getIdMainCategory,
} from '../../common/utils/categoryPrepare';

type prepareMethod = (params: any, query: any, path: string) => any;

const instance = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		// 'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Accept-Language': 'en-US,en;q=0.9',
		'Access-Control-Allow-Origin': '*',
	},
});

export const ads: prepareMethod = async () => {

	const axiosData = await instance.get('/ads');
	return axiosData.data.data;
};

export const ad: prepareMethod = async params => {
	try {
		const response = await instance.get(`/ads/${ params.id }`)
		return response.data;
	}
	catch (error) {
		console.log(error);
	}

};

export const categories: prepareMethod = async () => {
	const response = await instance.get('/categories');
	return response.data;
};

const getAdsByParams = async params => {
	const response = await instance.get(`/ads/?${ queryString.stringify(params) }`)
	return response.data;
};

export const category: prepareMethod = async (params, query, path) => {
	const { categorySlug }     = params;
	const { data: categories } = await instance.get('/categories');

	try {
		const categoryQueue    = findCategoriesQueueBySlug(categories, categorySlug);
		const breadcrumbs      = categoryQueueToBreadcrumbsFormat(categoryQueue);
		const idActiveCategory = getIdMainCategory(categoryQueue);

		const subcategories = getSubcategoryByCategoryQueue(categoryQueue);
		let listAdsGroups   = [];

		/* if (subcategories && subcategories.length > 0) {
			getAdsByParams()
		} else {

		} */
		

		return {
			categories,
			breadcrumbs,
			subcategories,
			idActiveCategory,
			listAdsGroups,
		};
	} catch (err) {
		return { categories, breadcrumbs: [], subcategory: [] };
	}
};