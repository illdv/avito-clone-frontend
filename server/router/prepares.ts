import { default as axios } from 'axios';
import * as queryString from 'query-string';

import {
	categoryQueueToBreadcrumbsFormat,
	findCategoriesQueueById,
	findCategoriesQueueBySlug,
	getCurrentCategoryByQueue,
	getIdFromCategory,
	getLocationNameByLocations,
	getLocationsIdByRequest,
	getMainCategory,
	getSubcategoryByCategoryQueue,
} from '../utils/categoryPrepare';

import { getDataForAdShowPage, getDataForAdsIndexPage } from '../api/ad';
import { getLitleCategories } from '../api/category';

interface ISugar {
	params?: any;
	query?: any;
	path?: string;
	accumulation?: any;
}

type prepareMethod = (sugar: ISugar, req: any) => any;

const instance = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Accept': 'application/json',
		'Accept-Language': 'en-US,en;q=0.9',
		'Content-Type': 'application/json',
	},
});

export const formatData = (data): string => {
	return queryString.stringify(data, { arrayFormat: 'bracket' });
};

export const adsPaginationPage: prepareMethod = async () => {
	try {
		const response = await instance.get(`/ads?${formatData(getDataForAdsIndexPage)}`);
		const ads      = response.data.data;
		const vip      = response.data.vip;
		return { ads, vip };
	} catch (e) {
		console.log(e);
	}
};

export const adForShow: prepareMethod = async ({ params }) => {
	try {
		const response = await instance.get(`/ads/${params.id}?${formatData(getDataForAdShowPage)}`);
		const ad       = response.data.ad;
		const similars = response.data.similars;
		return { ad, similars };
	} catch (error) {
		console.log(error);
	}
};

export const categories: prepareMethod = async () => {
	const response = await instance.get(`/categories?${formatData(getLitleCategories)}`);

	return response.data;
};

export const categoriesByLocation: prepareMethod = async (sugar, req) => {
	const query = {};

	if (req.cookies) {
		if (req.cookies.idCity) {
			query['city_id'] = req.cookies.idCity;
		} else if (req.cookies.idRegion) {
			query['region_id'] = req.cookies.idRegion;
		} else if (req.cookies.idCountry) {
			query['country_id'] = req.cookies.idCountry;
		}
	}

	const response = await instance.get(`/categories?${formatData({...query, ...getLitleCategories})}`);

	return response.data;
}; 

const getLiteAdsByQueryString = async (queryStringParams: string) => {
	const response = await instance.get(`/ads/?${ queryStringParams }`);
	return response.data;
};

export const location: prepareMethod = async (sugar, req) => {
	const { idCountry, idRegion, idCity } = getLocationsIdByRequest(req);

	const countries = await getCountries(null, req);

	let regions = [];

	if (idCountry) {
		regions = regions.concat(await getRegions({ query: { id: idCountry } }, req));
	}

	let cities = [];

	if (idRegion) {
		cities = cities.concat(await getCities({ query: { id: idRegion } }, req));
	}

	return {
		session: {
			idCountry,
			idRegion,
			idCity,
		},
		local: {
			idCountry,
			idRegion,
			idCity,
		},
		loaded: {
			session: {
				countries,
				regions,
				cities,
			},
			local: {
				countries,
				regions,
				cities,
			},
		},
		locationName: getLocationNameByLocations(idCountry, idRegion, idCity, countries, regions, cities),
	};
};

export const query: prepareMethod = async (sugar, req) => {
	const queryStr = req.url.match(/\?([^]+)/);

	const optionsStrings = queryStr && queryStr[1].match(/(options[^&]+)/g);

	const options = {};

	if (optionsStrings) {
		optionsStrings.forEach(optionString => {
			const optionsParams = optionString.match(/options\[([^&]+)\]=([^]+)/);

			if (optionsParams) {
				options[optionsParams[1]] = optionsParams[2];
			}
		});
	}

	return { ...sugar.query, options };
};

const getInstanceWithLanguageByReq = req => {
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
		const response = await getInstanceWithLanguageByReq(req).get('/countries');
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getRegions: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getInstanceWithLanguageByReq(req).get(`/countries/${query.id}/regions/%20`);
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getCities: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getInstanceWithLanguageByReq(req).get(`/regions/${query.id}/cities/%20`);
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const search: prepareMethod = async ({ query = {currentPage: '1'}, accumulation }, req) => {
	try {
		const url = formatData({
			...getDataForAdsIndexPage,
			...(accumulation.query || query),
		});

		console.log(url);

		const response     = await getLiteAdsByQueryString(url);

		const { current_page, last_page, per_page, total } = response;

		const pagination = {
			current_page,
			last_page,
			per_page,
			total,
		};

		return {
			ads: response.data,
			pagination,
		};

	} catch (err) {
		console.log('search = ', err);
		return [];
	}
};

export const breadcrumbs: prepareMethod = async ({ query, accumulation }, req) => {
	const categoryQueue = findCategoriesQueueById(accumulation.categories, query.category);
	return [
		{
			title: `All listings in ${accumulation.location.locationName}`,
			href: '/category',
		},
		...categoryQueueToBreadcrumbsFormat(categoryQueue, categoryQueue.length),
	];
};

export const countriesTotal: prepareMethod = async ({ query: queryParams, accumulation }, req) => {
	try {
		const hasRegion  = queryParams.region_id;
		const hasCountry = queryParams.country_id;
		const hasCity    = queryParams.city_id;

		if (hasRegion && !hasCity) {
			const responseRegions = await getInstanceWithLanguageByReq(req)
				.get(`/regions/${queryParams.region_id}/cities?appends[]=total_ads&category_id=${queryParams.category_id}`);
			return responseRegions.data;
		}

		if (hasCountry && !hasCity) {
			const responseRegions = await getInstanceWithLanguageByReq(req)
				.get(`/countries/${queryParams.country_id}/regions?appends[]=total_ads&category_id=${queryParams.category_id}`);
			return responseRegions.data;
		}

		const responseCountries = await getInstanceWithLanguageByReq(req)
			.get(`/countries?appends[]=total_ads&category_id=${queryParams.category_id}`);
		return responseCountries.data;
	} catch (e) {
		console.log('countriesTotal = ', e);
		return [];
	}
};

export const categoriesTotal: prepareMethod = async ({ query, accumulation }, req) => {
	try {
		const response = await instance.get(`/categories/${query.category_id}?appends[]=total_ads_count`);
		return response.data.category.children;
	} catch (e) {
		console.log('categoriesTotal = ', e);
		return [];
	}
};