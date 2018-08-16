import { IState as IManagerState } from '../blocks/manager-ad/ManagerAd';
import { ISellerInfoFields } from '../interfaces/managerAd';
import { IOption } from '../blocks/manager-ad/interface';

export const transformationAdToManagerState =
	(initialAd: IAd, caregories: ICategory[], sellerFields: ISellerInfoFields): IManagerState => {
		const attachedImages = initialAd.images.map(image => ({
			isBackend: true,
			id: image.id,
			file: image.file,
			base64: image.file_url,
		}));

		const options: IOption[] = (
			initialAd.options &&
			initialAd.options.length > 0 &&
			initialAd.options || []
		).map(option => {
			return {
				value: option.pivot.value,
				item: option,
			};
		});
		const selectedCategories: ICategory[] = findCategoriesQueueById(caregories, initialAd.category_id);
		const typeIds = getSelectAdTypeIdsBySelectedCategories(selectedCategories);

		return {
			step: 1,
			sellerInfoFields: sellerFields,
			adInfoFields: {
				title: {
					disable: false,
					value: initialAd ? initialAd.title : '',
					error: '',
				},
				price: {
					disable: false,
					value: initialAd ? initialAd.price : '',
					error: '',
				},
				description: {
					disable: false,
					value: initialAd ? initialAd.description : '',
					error: '',
				},
				address: {
					disable: false,
					value: initialAd ? initialAd.address : '',
					error: '',
				},
				city_id: {
					value: initialAd ? initialAd.city_id : 0,
					error: '',
				},
			},
			selectedCategories,
			attachedImages,
			defaultCategoryId: initialAd ? initialAd.category_id : null,
			location: {
				id: null,
				name: null,
				lng: initialAd ? initialAd.longitude : 55.75222,
				lat: initialAd ? initialAd.latitude : 37.61140,
			},
			options,
			typeIds,
			selectedType: initialAd ? initialAd.type_id : null,
			isVip: initialAd ? initialAd.is_vip as number : 0,
			selectedCategoriesError: {
				category: '',
				subCategory: '',
			},
		};
	};

export const isContainsId = (id: number) => (checkedItem: { id: number }) => {
	if (checkedItem) {
		return checkedItem.id === id;
	} else {
		return false;
	}
};

export function useOrDefault<T>(func: () => T, defaultValue: T): T {
	try {
		return func();
	} catch (e) {
		return defaultValue;
	}
}

export const findCategoriesQueueById = (categories: ICategory[], findId): any[] | null => {
	if (!findId) {
		return [];
	}

	return categories.reduce((acc, category) => {
		if (acc) {
			return acc;
		}

		const id = category.id;

		if (id === findId) {
			return [category];
		} else {
			if (category.children.length > 0) {
				const result = findCategoriesQueueById(category.children, findId);

				if (result !== null) {
					return [category].concat(result);
				} else {
					return null;
				}
			} else {
				return null;
			}
		}
	}, false as any);
};

export const getSelectAdTypeIdsBySelectedCategories = (selectedCategories: ICategory[]) => { // TODO hardcode
	const activeCategory: ICategory = selectedCategories && selectedCategories.length > 0 &&
			selectedCategories[selectedCategories.length - 1];

	if (activeCategory && [1, 10, 11, 12, 13].indexOf(activeCategory.id) !== -1) {
		return [1, 2, 3];
	}

	return [];
}