import { AxiosWrapper } from 'client/common/api/AxiosWrapper';
import * as queryString from 'query-string';

interface IFavoritesRequest {
	favorites_ids: number[];
}

interface IPostFavoritesRequest extends IFavoritesRequest {
}

interface IDeleteFavoritesRequest extends IFavoritesRequest {
}

function getFavorites(request: IFavoritesRequest) {
	const fields = ['id', 'title', 'description', 'price', 'category_id'];
	const images = ['images'];
	const response = {
		favorites_ids: request.favorites_ids,
		fields,
		with: images,
	};
	const query = queryString.stringify(response, {arrayFormat: 'bracket'});
	return AxiosWrapper.get(`/favorites?${query}`);
}

function postFavorites(request: IPostFavoritesRequest) {
	return AxiosWrapper.post('/favorites', request);
}

function deleteFavorites(request: IDeleteFavoritesRequest) {
	return AxiosWrapper.deleteResponse('/favorites', request);
}

export const favoritesAPI = {
	postFavorites,
	deleteFavorites,
	getFavorites,
};