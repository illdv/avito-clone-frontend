import { AxiosWrapper } from './AxiosWrapper';
import {AxiosPromise} from 'axios';

export class CategoriesAPI {
	public static getCategories(): AxiosPromise<any> {
		return AxiosWrapper.get('/categories');
	}
}
