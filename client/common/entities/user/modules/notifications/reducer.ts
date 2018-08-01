import { createReducer } from 'redux-act';
import { INotification } from './interfaces';
import { NotificationActions } from './actions';

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
