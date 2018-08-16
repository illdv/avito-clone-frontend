import { combineReducers } from 'redux';

import modalJuggler from '../modal-juggler/module';
import user from '../entities/user/rootReducer';
import location from 'client/common/location/module';
import search from 'client/common/search/store';

export default combineReducers({
	modalJuggler,
	location,
	user,
	search,
});