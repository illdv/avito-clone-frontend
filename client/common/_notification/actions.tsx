import { createActionCreator, IAsyncAction } from 'client/common/user/utils';
import { INotification } from 'client/common/notification/interface';

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
