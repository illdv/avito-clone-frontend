import { createActionCreator, IAsyncAction } from 'client/common/user/utils';
import { INotification } from 'client/common/notification/interface';

const createAsyncAction = createActionCreator('NOTIFICATION');

const loading = createAsyncAction('LOADING');

export const NotificationActions: INotificationActions = {
	loading,
};

export interface INotificationActions {
	loading: IAsyncAction<{}, INotification[]>;
}
