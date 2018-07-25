import { createReducer } from 'redux-act';
import { INotification } from 'client/common/notification/interface';
import { NotificationActions } from 'client/common/notification/actions';

export interface INotificationState {
	data: INotification[];
}

const initialState = (): INotificationState => ({
	data: [],
});

const reducer = createReducer({}, initialState());

reducer.on(NotificationActions.loading.SUCCESS, (state, payload): INotificationState => ({
	...state,
	data: payload,
}));

export default reducer;
