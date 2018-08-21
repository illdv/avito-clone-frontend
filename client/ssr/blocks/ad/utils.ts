import { IAdCity } from 'client/ssr/blocks/ad/interface';

/**
 * If exists first images return it url or url default images.
 */
export function extractPreviewImage(entityWithImage: { images?: IImage[] }): string {
	if (entityWithImage.images && entityWithImage.images[0]) {
		return entityWithImage.images[0].file_url;
	} else {
		return '/static/img/no-image.svg';
	}
}


export function createAddress(city: IAdCity): string {
	const { area: areaTitle, title: cityTitle, country: { title: countryTitle } } = city;
	const countryAddress = countryTitle ? `${countryTitle}`: '';
	const areaAddress = areaTitle ? `, ${areaTitle}` : '';
	const cityAddress = cityTitle ? `, ${cityTitle}` : '';

	return countryAddress + areaAddress + cityAddress ;
}