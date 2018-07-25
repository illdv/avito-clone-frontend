import { Image } from 'client/common/ads/interface';

/**
 * If exists first images return it url or url default images.
 */
export function extractPreviewImage(entityWithImage: { images?: Image[] }): string {
	if (entityWithImage.images && entityWithImage.images[0]) {
		return entityWithImage.images[0].file_url;
	} else {
		return '/static/img/no-image.svg';
	}
}