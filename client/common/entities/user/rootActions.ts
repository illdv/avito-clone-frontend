import store from '../../../common/store/index';
import { bindModuleAction } from './utils';

import { notificationActions as notifications, INotificationActions } from './modules/notifications/actions';
import { favoritesActions as favorites, IFavoritesActions } from './modules/favorites/actions';
import { ownedAdsActions as ownedAds, IOwnedAdsActions } from './modules/owned-ads/actions';
import { profileActions as profile, IProfileActions } from './modules/profile/actions';
import { commonActions as common, ICommonActions } from './modules/common/actions';
import { tokenActions as token, ITokenActions } from './modules/token/actions';

export interface IUserActions {
	notifications: INotificationActions;
	favorites: IFavoritesActions;
	ownedAds: IOwnedAdsActions;
	profile: IProfileActions;
	common: ICommonActions;
	token: ITokenActions;
}

export const UserActions: IUserActions = {
	notifications: bindModuleAction<INotificationActions>(notifications, store.dispatch),
	favorites: bindModuleAction<IFavoritesActions>(favorites, store.dispatch),
	ownedAds: bindModuleAction<IOwnedAdsActions>(ownedAds, store.dispatch),
	profile: bindModuleAction<IProfileActions>(profile, store.dispatch),
	common: bindModuleAction<ICommonActions>(common, store.dispatch),
	token: bindModuleAction<ITokenActions>(token, store.dispatch),
};