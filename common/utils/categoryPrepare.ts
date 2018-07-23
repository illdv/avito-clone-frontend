export const findCategoriesQueueBySlug = (categories, categorySlug): any[] | null => {
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

export const categoryQueueToBreadcrumbsFormat = categoryQueue => {
	if (!categoryQueue && categoryQueue.length < 1) {
		return []
	}

	return categoryQueue.map((category, index, arr) => {
		let totla;

		if (index === arr.length - 1) {
			totla = ` ${category.total_ads_count}`;
		}

		return {
			title: category.title + (totla || ''),
			href: `/category/${ encodeURI(category.title) }`,
		};
	});
};

export const getIdMainCategory = categoryQueue => {
	return categoryQueue ? categoryQueue[0].id : null;
}

export const getSubcategoryByCategoryQueue = categoryQueue => {
	if (!categoryQueue && categoryQueue.length < 1) {
		return [];
	}

	const currentCategory = categoryQueue[categoryQueue.length - 1]; // Last children

	return currentCategory.children;
};