import { createReducer } from 'redux-act';
import { notificationActions } from './actions';

const initialState = (): INotificationState => ({
	items: [],
	noReadCount: 0,
});

const reducer = createReducer({}, initialState());

reducer.on(notificationActions.setNoReadCount.REQUEST, (state, payload) => ({
	...state,
	noReadCount: payload,
}));

reducer.on(notificationActions.loading.SUCCESS, (state, payload): INotificationState => ({
	...state,
	items: payload,
}));

export default reducer;
