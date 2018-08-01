import favoritesSagas from './modules/favorites/saga';
import profileSagas from './modules/profile/saga';
import commonSagas from './modules/common/saga';
import ownedAds from './modules/owned-ads/saga';
import tokenSagas from './modules/token/saga';

export default [...favoritesSagas, ...profileSagas, ...commonSagas, ...ownedAds, ...tokenSagas];