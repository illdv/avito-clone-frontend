import { AxiosWrapper } from './AxiosWrapper';
import {AxiosPromise} from 'axios';

export class NotificationAPI {
	public static get(): AxiosPromise<any> {
		return AxiosWrapper.get('/notifications?orderBy[created_at]=desc');
	}

	public static read(ids: string[]): AxiosPromise<any> {
		return NotificationAPI.markAs(ids, 'read');
	}

	private static markAs(ids: string[], action: string): AxiosPromise<any> {
		const value = action.slice(0, 1).toUpperCase() + action.slice(1);

			return AxiosWrapper.patch(`/notifications`, { action: `markAs${value}`, ids });
	}
}
