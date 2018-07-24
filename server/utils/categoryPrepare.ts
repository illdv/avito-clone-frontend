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