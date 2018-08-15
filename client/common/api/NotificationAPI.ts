import { AxiosWrapper } from './AxiosWrapper';
import {AxiosPromise} from "axios";

export class NotificationAPI {
	public static get(): AxiosPromise<any> {
		return AxiosWrapper.get('/notifications');
	}

	public static read(id: string): AxiosPromise<any> {
		return this.markAs(id, 'read');
	}

	private static markAs(id: string, action: string): AxiosPromise<any> {
		const value = action.slice(0, 1).toUpperCase() + action.slice(1);

		return AxiosWrapper.put(`/notifications/${id}`, { action: `markAs${value}` });
	}
}
