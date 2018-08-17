import { IRangePrice } from 'client/ssr/blocks/search/Search';
import { IOption } from 'client/ssr/blocks/search/Options'

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

export const getSelectedOptions = (options: IOption[]) => {
	return options.reduce((result, option) => {
		return { ...result, [option.item.id]: option.value };
	}, {});
};

/**
 * Return option whit value from search.
 */
export const bindingOptionsWhitValue = (categoriesQueue: ICategory[], optionsValue: object): any[] => {
	if (categoriesQueue.length) {
		const totalOptions = categoriesQueue.slice(-1)[0].total_options;

		return totalOptions.map(option => ({
			value: optionsValue ? optionsValue[option.id] || '' : '',
			item: option,
		}));
	}

	return [];
};