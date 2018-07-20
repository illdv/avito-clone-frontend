import { default as axios } from 'axios';
import * as queryString from 'query-string'

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

const getAdsByParams = async params => {
    const response = await instance.get(`/ads?${ queryString.stringify(params) }`)
    return response.data;
}

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

}



export const category: prepareMethod = async (params, query, path) => {
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