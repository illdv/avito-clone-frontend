import * as jsHttpCookie from 'cookie';

export const findCategoriesQueueBySlug = (categories, categorySlug): any[] | null => {
	if (!categorySlug) {
		return [];
	}

	return categories.reduce((acc, category) => {
		if (acc) {
			return acc;
		}

		const slug = category.slug.toLowerCase();

		if (slug === categorySlug.toLowerCase()) {
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

export const findCategoriesQueueById = (categories, categoryId): any[] | null => {
	if (!categoryId) {
		return [];
	}

	return categories.reduce((acc, category) => {
		if (acc) {
			return acc;
		}

		if (category.id == categoryId) {
			return [category];
		} else {
			if (category.children.length > 0) {
				const result = findCategoriesQueueBySlug(category.children, categoryId);

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

export const categoryQueueToBreadcrumbsFormat = categoryQueue => {
	if (!categoryQueue || categoryQueue.length < 1) {
		return [];
	}

	return categoryQueue.map((category, index, arr) => {
		let totla;

		if (index === arr.length - 1) {
			totla = ` ${category.total_ads_count}`;
		}

		return {
			title: category.title + (totla || ''),
			href: `/category/${ encodeURI(category.slug) }`,
		};
	});
};

export const getMainCategory = categoryQueue => {
	return (categoryQueue && categoryQueue.length > 0) ? categoryQueue[0] : null;
};

export const getCurrentCategoryByQueue = categoryQueue => {
	return (categoryQueue && categoryQueue.length > 0) ? categoryQueue[categoryQueue.length - 1] : null;
}

export const getIdFromCategory = categoty => {
	return categoty ? categoty.id : null;
};

export const getSubcategoryByCategoryQueue = categoryQueue => {
	if (!categoryQueue || categoryQueue.length < 1) {
		return [];
	}

	const currentCategory = categoryQueue[categoryQueue.length - 1]; // Last children

	return currentCategory.children;
};

export const getLocationsIdByRequest = req => {
	const result = {
		idCountry: null,
		idRegion: null,
		idCity: null,
	};

	if (req && req.headers) {
		const cookies = req.headers.cookie;

		if (typeof cookies === 'string') {
			const cookiesJSON = jsHttpCookie.parse(cookies);

			if (cookiesJSON.idCountry) {
				result.idCountry = Number(cookiesJSON.idCountry) || null;
			}

			if (cookiesJSON.idRegion) {
				result.idRegion = Number(cookiesJSON.idRegion) || null
			}

			if (cookiesJSON.idCity) {
				result.idCity = Number(cookiesJSON.idCity) || null
			}
		}
	}
	;

	return result;
}

export const getLocationNameByLocations = (idCountry, idRegion, idCity, countries, regions, cities) => {
	if (idCity) {
		if (cities.length > 0) {

			const result = cities.filter(city => {
				return city.city_id === idCity;
			});

			if (result.length > 0) {
				return result[0].title;
			}
		}
	}

	if (idRegion) {
		if (regions.length > 0) {
			const result = regions.filter(region => {
				return region.region_id === idRegion;
			});
			if (result.length > 0) {
				return result[0].title;
			}
		}
	}

	if (idCountry) {
		if (countries.length > 0) {
			const result = countries.filter(country => {
				return country.country_id === idCountry;
			});
			if (result.length > 0) {
				return result[0].title;
			}
		}
	}

	return 'World';
}