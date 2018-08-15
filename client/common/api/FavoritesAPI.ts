import { AxiosWrapper } from 'client/common/api/AxiosWrapper';
import * as queryString from 'query-string';

interface IFavoritesRequest {
	favorites_ids: number[];
}

export class FavoritesAPI {
	public static get(request: IFavoritesRequest) {
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

	public static post(request: IFavoritesRequest) {
		return AxiosWrapper.post('/favorites', request);
	}

	public static remove(request: IFavoritesRequest) {
		return AxiosWrapper.deleteResponse('/favorites', request);
	}
}
