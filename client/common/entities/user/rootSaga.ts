import notificationSaga from './modules/notifications/saga';
import favoritesSagas from './modules/favorites/saga';
import profileSagas from './modules/profile/saga';
import commonSagas from './modules/common/saga';
import tokenSagas from './modules/token/saga';
import ownedAds from './modules/owned-ads/saga';

export default [
	...notificationSaga,
	...favoritesSagas,
	...profileSagas,
	...commonSagas,
	...tokenSagas,
	...ownedAds,
];