import { createActionCreator, IAsyncAction } from '../../utils';

const createAsyncAction = createActionCreator('NOTIFICATION');

const loading = createAsyncAction('LOADING');
const read    = createAsyncAction('READ');

export interface INotificationActions {
	loading: IAsyncAction<{}, INotification[]>;
	read: IAsyncAction<{ id: string }>;
}

export const notificationActions: INotificationActions = {
	loading,
	read,
};