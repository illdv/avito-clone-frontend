import { combineReducers } from 'redux';

import favorites from './modules/favorites/reducer';
import ownedAds from './modules/owned-ads/reducer';
import profile from './modules/profile/reducer';
import token from './modules/token/reducer';

export default combineReducers({
	favorites,
	ownedAds,
	profile,
	token,
});