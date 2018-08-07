import { default as axios } from 'axios';
import * as queryString from 'query-string';

import {
	categoryQueueToBreadcrumbsFormat,
	findCategoriesQueueBySlug,
	findCategoriesQueueById,
	getCurrentCategoryByQueue,
	getIdFromCategory,
	getLocationNameByLocations,
	getLocationsIdByRequest,
	getMainCategory,
	getSubcategoryByCategoryQueue,
} from '../utils/categoryPrepare';

import {getDataForAdsIndexPage, getDataForAdShowPage} from '../api/ad';

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

const formatData = (data) => {
	return queryString.stringify(data, {arrayFormat: 'bracket'});
};

export const ads: prepareMethod = async () => {
	try {
		const response = await instance.get(`/ads?${formatData(getDataForAdsIndexPage)}`);
		return response.data.data;
	} catch (e) {
		console.log(e);
	}
};

export const ad: prepareMethod = async ({ params }) => {
	try {
		const response = await instance.get(`/ads/${params.id}?${formatData(getDataForAdShowPage)}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const categories: prepareMethod = async () => {
	const response = await instance.get('/categories?appends[]=children');
	return response.data;
};

const getAdsByParams = async params => {
	const response = await instance.get(`/ads/?${ queryString.stringify(params) }`);
	return response.data;
};

export const location: prepareMethod = async (sugar, req) => {
	/* const ip = req.clientIp;

	if (req.session.location) {
		return req.session.location;
	}

	if (req.session.location === void 0) { // First request
		try {
			const location = await iplocation(ip);
		   return undefined;
		} catch (err) {
			return undefined;
		}
	} else {
		return req.session.location;
	} */

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
	return sugar.query;
};

export const vipAds: prepareMethod = async ({ params, query, path }, req) => {
	const vipAdsResponse = await getAdsByParams({ vip: 1, count: 8 });
	return vipAdsResponse.data;
};

export const category: prepareMethod = async ({ params, query, path }, req) => {
	const { categorySlug }                = params;
	const { idCountry, idRegion, idCity } = getLocationsIdByRequest(req);

	/*
	let paramsForReqCategory = null;

	if (idCity) {
		paramsForReqCategory = { city_id: idCity };
	} else if (idRegion) {
		paramsForReqCategory = { region_id: idRegion };
	} else if (idCountry) {
		paramsForReqCategory = { country_id: idCountry };
	}

	 const { data: categories } = paramsForReqCategory
		? await instance.get(`/categories/?${ queryString.stringify(paramsForReqCategory) }`)
		: await instance.get('/categories');
		*/

	const { data: categories } = await instance.get('/categories');

	try {
		const categoryQueue   = findCategoriesQueueBySlug(categories, categorySlug);
		const breadcrumbs     = categoryQueueToBreadcrumbsFormat(categoryQueue);
		const currentCategory = getCurrentCategoryByQueue(categoryQueue);
		const mainCategory    = getMainCategory(categoryQueue);
		const mainCategoryId  = getIdFromCategory(mainCategory);

		let subcategories = [];
		const adGroupList = [];

		const reqForVipAds: any = { vip: 1, count: 4 };

		if (currentCategory) {
			reqForVipAds.category = currentCategory.id;
			subcategories         = subcategories.concat(getSubcategoryByCategoryQueue(categoryQueue));
		} else {
			subcategories = subcategories.concat(categories);
		}

		const vipAds = await getAdsByParams(reqForVipAds);

		if (vipAds.data.length > 0) {
			adGroupList.push({
				id: 999999999999999, // TODO - Need fix
				title: 'Vip ads',
				ads: vipAds.data,
			});
		}

		if (currentCategory) {
			if (subcategories && subcategories.length > 0) {
				subcategories.forEach(subcategory => {
					if (subcategory.ads.length > 0) {
						adGroupList.push({
							title: subcategory.title,
							ads: subcategory.ads,
						});
					}
				});
			} else {
				if (currentCategory && currentCategory.ads.length > 0) {
					adGroupList.push({
						id: currentCategory.id,
						title: currentCategory.title,
						ads: currentCategory.ads,
					});
				}
			}
		} else {
			const ads = await getAdsByParams({});

			if (ads.data.length > 0) {
				adGroupList.push({
					title: 'All ads',
					ads: ads.data,
				});
			}
		}

		return {
			categories,
			breadcrumbs,
			mainCategoryId,
			mainCategory,
			subcategories,
			adGroupList,
		};
	} catch (err) {
		console.log(err);
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
		console.log(err);
		return [];
	}
};

export const getRegions: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getInstanseWithLanguageByReq(req).get(`/countries/${query.id}/regions/%20`);
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getCities: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getInstanseWithLanguageByReq(req).get(`/regions/${query.id}/cities/%20`);
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const search: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getAdsByParams(query || {});
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const breadcrumbs: prepareMethod = async ({ query, accumulation }, req) => {
	const categoryQueue   = findCategoriesQueueById(accumulation.categories, query.category);
	console.log(categoryQueue);
	return [
		{
			title: `All listings in ${accumulation.location.locationName}`,
			href: '/category',
		},
		...categoryQueueToBreadcrumbsFormat(categoryQueue, categoryQueue.length),
	];
};