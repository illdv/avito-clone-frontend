import { default as axios } from 'axios';
import * as queryString from 'query-string';
import * as iplocation from 'iplocation';

import {
	findCategoriesQueueBySlug,
	categoryQueueToBreadcrumbsFormat,
	getSubcategoryByCategoryQueue,
	getMainCategory,
	getIdFromCategory,
	getCurrentCategoryByQueue,
	getLocationNameByLocations,
	getLocationsIdByRequest,
} from '../utils/categoryPrepare';

interface ISugar {
	params?: any;
	query?: any;
	path?: string;
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

export const category: prepareMethod = async ({params, query, path}, req) => {
	const { categorySlug } = params;
	const { idCountry, idRegion, idCity } = getLocationsIdByRequest(req);

	let paramsForReqCategory = null;

	if (idCity) {
		paramsForReqCategory = { city_id: idCity };
	} else if (idRegion) {
		paramsForReqCategory = { region_id: idRegion };
	} else if (idCountry) {
		paramsForReqCategory = { country_id: idCountry };
	}

	/* const { data: categories } = paramsForReqCategory
		? await instance.get(`/categories/?${ queryString.stringify(paramsForReqCategory) }`)
		: await instance.get('/categories'); */
	
	const { data: categories } = await instance.get('/categories');

	try {
		const categoryQueue    = findCategoriesQueueBySlug(categories, categorySlug);
		const breadcrumbs      = categoryQueueToBreadcrumbsFormat(categoryQueue);
		const currentCategory  = getCurrentCategoryByQueue(categoryQueue);
		const mainCategory     = getMainCategory(categoryQueue);
		const mainCategoryId   = getIdFromCategory(mainCategory);

		let subcategories = [];
		const adGroupList = [];

		const reqForVipAds: any = { vip: 1, count: 4 };

		if (currentCategory) {
			reqForVipAds.category = currentCategory.id;
			subcategories = subcategories.concat(getSubcategoryByCategoryQueue(categoryQueue));
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
		console.log(err)
		return [];
	}
};

export const getRegions: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getInstanseWithLanguageByReq(req).get(`/countries/${query.id}/regions/%20`);
		return response.data;
	} catch (err) {
		console.log(err)
		return [];
	}
};

export const getCities: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getInstanseWithLanguageByReq(req).get(`/regions/${query.id}/cities/%20`);
		return response.data;
	} catch (err) {
		console.log(err)
		return [];
	}
};

export const search: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getAdsByParams(query || {});
		return response.data;
	} catch (err) {
		console.log(err)
		return [];
	}
};