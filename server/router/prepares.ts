import { default as axios } from 'axios';
import * as queryString from 'query-string';
import * as iplocation from 'iplocation';

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

const instanseForLocation = axios.create({
	baseURL: process.env.API_FOR_LOCATION,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Accept-Language': 'en-US,en;q=0.9',
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
	const response = await instance.get(`/ads?${ queryString.stringify(params) }`)
	return response.data;
}

const findCategoriesQueueBySlug = (categories, categorySlug): any[] | null => {
	return categories.reduce((acc, category) => {
		if (acc) {
			return acc;
		}

		const slug = category.title.toLowerCase();

		if (slug === categorySlug) {
			return [category];
		} else {
			if (category.children.length > 0) {
				const result = findCategoriesQueueBySlug(category.children, categorySlug);

				if (result !== null) {
					return [category].concat(result);
				} else {
					return null;
				}
			} else {
				return null;
			}
		}
	}, false);
};

const categoryQueueToBreadcrumbsFormat = categoryQueue => {
	if (!categoryQueue && categoryQueue.length < 1) {
		return []
	}

	return categoryQueue.map((category, index, arr) => {
		let totla;

		if (index === arr.length - 1) {
			totla = ` ${category.total_ads_count}`;
		}

		return {
			name: category.title + (totla || ''),
			href: `/category/${ encodeURI(category.title) }`,
		};
	});
}

const getIdMainCategory = categoryQueue => {
	return categoryQueue ? categoryQueue[0].id : null;
}

const getSubcategoryByCategoryQueue = async categoryQueue => {
	if (!categoryQueue && categoryQueue.length < 1) {
		return [];
	} 

	const currentCategory = categoryQueue[categoryQueue.length - 1]; // Last children

	return currentCategory.children
}

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

	try {
		const categoryQueue = findCategoriesQueueBySlug(categories, categorySlug);
		const breadcrumbs = categoryQueueToBreadcrumbsFormat(categoryQueue);
		//const subcategory = await getSubcategoryByCategoryQueue(categoryQueue);
		const idActiveCategory = getIdMainCategory(categoryQueue);

		return {
			categories,
			breadcrumbs,
			//subcategory
			idActiveCategory,
		};
	} catch (err) {
		return { categories, breadcrumbs: [], subcategory: [] };
	}
};

export const getCountries: prepareMethod = async () => {
	try{
		const response = await instanseForLocation.get('/countries');
		return response.data;
	} catch (err) {
		console.log(err)
		return [];
	}
};

export const getRegions: prepareMethod = async ({ query }) => {
	try{
		const response = await instanseForLocation.get(`/countries/${query.id}/regions/%20`);
		return response.data;
	} catch (err) {
		console.log(err)
		return [];
	}
};

export const getCities: prepareMethod = async ({ query }) => {
	try{
		const response = await instanseForLocation.get(`/regions/${query.id}/cities/%20`);
		console.log(response);
		return response.data;
	} catch (err) {
		console.log(err)
		return [];
	}
};