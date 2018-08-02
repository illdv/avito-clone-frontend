import { createReducer } from 'redux-act';
import { notificationActions } from './actions';


const initialState = (): INotificationState => ({
	items: [],
});

const reducer = createReducer({}, initialState());

reducer.on(notificationActions.loading.SUCCESS, (state, payload): INotificationState => ({
	...state,
	items: payload,
}));

export default reducer;
