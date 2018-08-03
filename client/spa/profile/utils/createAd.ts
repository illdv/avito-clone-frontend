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

		return {
			step: 1,
			sellerInfoFields: sellerFields,
			adInfoFields: {
				title: { disable: false, value: initialAd.title },
				price: { disable: false, value: initialAd.price },
				description: { disable: false, value: initialAd.description },
			},
			selectedCategories: findCategoriesQueueById(caregories, initialAd.category_id),
			attachedImages,
			defaultCategoryId: initialAd.category_id,
			location: {
				id: null,
				name: null,
				lng: initialAd.longitude,
				lat: initialAd.latitude,
			},
			options,
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