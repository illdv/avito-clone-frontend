import { AxiosWrapper } from './AxiosWrapper';
import {AxiosPromise} from 'axios';

export class NotificationAPI {
	public static get(): AxiosPromise<any> {
		return AxiosWrapper.get('/notifications');
	}

	public static read(ids: string[]): AxiosPromise<any> {
		return this.markAs(ids, 'read');
	}

	private static markAs(ids: string[], action: string): AxiosPromise<any> {
		const value = action.slice(0, 1).toUpperCase() + action.slice(1);

			return AxiosWrapper.put(`/notifications/notification_ids=${ids}`, { action: `markAs${value}` });
	}
}
