import { combineReducers } from 'redux';

import notifications from './modules/notifications/reducer';
import favorites from './modules/favorites/reducer';
import ownedAds from './modules/owned-ads/reducer';
import profile from './modules/profile/reducer';
import token from './modules/token/reducer';

export default combineReducers({
	notifications,
	favorites,
	ownedAds,
	profile,
	token,
});