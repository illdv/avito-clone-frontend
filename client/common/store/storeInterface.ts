import { IModalJugglerState } from '../modal-juggler/modalJugglerInterface';
import { IUserState } from 'client/common/user/reducer';
import { IAdsState } from 'client/common/ads/reducer';
import { ICategoryState } from 'client/common/categories/reducer';
import { INotificationState } from 'client/common/notification/reducer';
import { ILocationStoreState } from '../location/locationInterface';

export interface IRootState {
	modalJuggler: IModalJugglerState;
	user: IUserState;
	ads: IAdsState;
	categories: ICategoryState;
	location: ILocationStoreState;
	notification: INotificationState;
}