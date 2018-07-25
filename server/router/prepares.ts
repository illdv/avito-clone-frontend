import { default as axios } from 'axios';
import * as queryString from 'query-string';
import * as iplocation from 'iplocation';

import {
	findCategoriesQueueBySlug,
	categoryQueueToBreadcrumbsFormat,
	getSubcategoryByCategoryQueue,
	getIdMainCategory,
} from '../utils/categoryPrepare';

interface ISugar {
	params: any;
	query: any;
	path: string;
} 

type prepareMethod = (sugar: ISugar, req: any) => any;

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

export  const ad: prepareMethod = async ({ params }) => {
	try {
		const response = await instance.get(`/ads/${ params.id }`)
		return response.data;
	} catch (error) {
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


export const location: prepareMethod = async (sugar, req) => {
	const ip = req.clientIp;

	if (req.session.location) {
		return req.session.location;
	}

	if (req.session.location === void 0) { // First request
		try {
			const location = await iplocation(ip);
			/*
				https://www.npmjs.com/package/iplocation
			*/
		   return undefined;
		} catch (err) {
			return undefined;
		}
	} else {
		return req.session.location;
	}

} 

export const category: prepareMethod = async ({params, query, path}) => {
	const { categorySlug } = params;
	const { data: categories } = await instance.get('/categories');
	console.log('back');
	try {
		const categoryQueue    = findCategoriesQueueBySlug(categories, categorySlug);
		const breadcrumbs      = categoryQueueToBreadcrumbsFormat(categoryQueue);
		console.log('back', breadcrumbs);

		const idActiveCategory = getIdMainCategory(categoryQueue);

		const subcategories = getSubcategoryByCategoryQueue(categoryQueue);
		let listAdsGroups   = [];

		return {
			categories,
			breadcrumbs,
			//subcategory
			idActiveCategory,
			subcategories,
			listAdsGroups,
		};
	} catch (err) {
		console.log('err');
		return { categories, breadcrumbs: [], subcategory: [] };
	}
};

const getInstanseWithLanguageByReq = req => {
	return axios.create({
		baseURL: process.env.API_FOR_LOCATION,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Accept-Language': req.headers['accept-language'],
		},
	});
};

export const getCountries: prepareMethod = async (sugar, req) => {
	try {
		const response = await getInstanseWithLanguageByReq(req).get('/countries');
		return response.data;
	} catch (err) {
		return [];
	}
};

export const getRegions: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getInstanseWithLanguageByReq(req).get(`/countries/${query.id}/regions/%20`);
		return response.data;
	} catch (err) {
		return [];
	}
};

export const getCities: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getInstanseWithLanguageByReq(req).get(`/regions/${query.id}/cities/%20`);
		return response.data;
	} catch (err) {
		return [];
	}
};