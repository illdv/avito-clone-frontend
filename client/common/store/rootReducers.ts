import { combineReducers } from 'redux';

import modalJuggler from '../modal-juggler/module';
import user from '../user/reducer';
import ads from '../ads/reducer';

export default combineReducers({
	modalJuggler,
	user,
	ads,
});
