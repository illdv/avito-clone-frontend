import { default as axios } from 'axios';

type prepareMethod = (params: any, query: any, path: string) => any;

const instance = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

export const ads: prepareMethod = async () => {

	const axiosData = await instance.get('/ads');
	return axiosData.data.data;
};

export  const ad: prepareMethod = async params => {
	const response = await instance.get(`/ads/${ params.id }`);
	return response.data;
};

export const categories: prepareMethod = async () => {
	const response = await instance.get('/categories');
	return response.data;
};

const findCategoriesQueueBySlug = (categories, categorySlug): any[]|null => {
	return categories.reduce((acc, category) => {
		if (acc) {
			return acc;
		}

		const slug = category.title.toLowerCase();

		if (slug === categorySlug) {
			return [ category ];
		} else {
			if (category.children.length > 0) {
				const result = findCategoriesQueueBySlug(category.children, categorySlug);

				if (result !== null) {
					return [ category ].concat(result);
				} else {
					return null;
				}
			} else {
				return null;
			}
		}
	}, false);
};

export const category: prepareMethod = async (params, query, path) => {
	const { categorySlug } = params;
	const { data: categories } = await instance.get('/categories');

	try {
		const breadcrumbs = findCategoriesQueueBySlug(categories, categorySlug);
		return { categories, breadcrumbs };
	} catch (err) {
		return { categories, breadcrumbs: null };
	}
};