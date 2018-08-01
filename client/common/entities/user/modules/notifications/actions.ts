import { createActionCreator, IAsyncAction } from '../../utils';
import { INotification } from './interfaces';

const createAsyncAction = createActionCreator('NOTIFICATION');

const loading = createAsyncAction('LOADING');
const read    = createAsyncAction('READ');

export const NotificationActions: INotificationActions = {
	loading,
	read,
};

export interface INotificationActions {
	loading: IAsyncAction<{}, INotification[]>;
	read: IAsyncAction<{ id: string }>;
}
