import { IState as IManagerState } from './ManagerAd';
import { IAds } from 'client/common/ads/interface';
import { ISellerInfoFields } from './interface';

export const transformationAdToManagerState = (initialAd: IAds, sellerFields: ISellerInfoFields): IManagerState => {
	const attachedImages = initialAd.images.map(image => ({
		isBackend: true,
		id: image.id,
		file: image.file,
		base64: image.file_url,
	}));

	return {
		step: 1,
		sellerInfoFields: sellerFields,
		adInfoFields: {
			title: { disable: false, value: initialAd.title },
			price: { disable: false, value: initialAd.price },
			description: { disable: false, value: initialAd.description },
		},
		selectedCategories: [],
		attachedImages,
		defaultCategoryId: initialAd.category_id,
		location: {
			id: null,
			name: null,
			lng: initialAd.longitude,
			lat: initialAd.latitude,
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