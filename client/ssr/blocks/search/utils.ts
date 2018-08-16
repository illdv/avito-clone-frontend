import { IRangePrice } from 'client/ssr/blocks/search/Search';

/**
 * Delete all value equal null, undefined or empty string.
 */
export function clearObject(dirtyObject) {
	return Object.entries(dirtyObject).reduce((result, [key, value]) => {
		if (!value || value === '') {
			return result;
		}
		if (typeof value === 'object' && !Array.isArray(value)) {
			return { ...result, [key]: clearObject(value) };
		}
		return { ...result, [key]: value };
	}, {});
}

/**
 * Return last category id if there is or null
 */
export const extractCategoryId = (selectedCategories: ICategory[]) => {
	if (selectedCategories.length > 0) {
		return selectedCategories[selectedCategories.length - 1].id;
	}
	return null;
};

/**
 * Return range for prise.
 */
export const extractRangePrice = (rangePrice: IRangePrice) => {
	const { priceFrom, priceTo } = rangePrice;

	return {
		price: [
			priceFrom,
			priceTo,
		],
	};
};

export const getSelectedOptions = (options: any) => {
	return options.map(option => ({
		[option.item.id]: option.value,
	}));
};