import { combineReducers } from 'redux';

import modalJuggler from '../modal-juggler/module';
import user from '../user/reducer';
import ads from '../ads/reducer';
import categories from '../categories/reducer';
import { UserActions } from 'client/common/user/actions';

const appReducers = combineReducers({
	modalJuggler,
	user,
	ads,
	categories,
});

const rootReducer = (state, action) => {
	if (action.type === UserActions.logout.REQUEST({}).type) {
		state = undefined;
	}
	return appReducers(state, action);
};

export default rootReducer;
