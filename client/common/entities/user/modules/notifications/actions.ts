import { createActionCreator, IAsyncAction } from '../../utils';

const createAsyncAction = createActionCreator('NOTIFICATION');

const loading        = createAsyncAction('LOADING');
const read           = createAsyncAction('READ');
const setNoReadCount = createAsyncAction('SET_NO_READ_COUNT');

export interface INotificationActions {
	loading: IAsyncAction<{}, INotification[]>;
	read: IAsyncAction<{ id: string }>;
	setNoReadCount: IAsyncAction<number>;
}

export const notificationActions: INotificationActions = {
	setNoReadCount,
	loading,
	read,
};