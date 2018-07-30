import { IModalJugglerState } from '../modal-juggler/modalJugglerInterface';
import { IAdsState } from 'client/common/ads/reducer';
import { ICategoryState } from 'client/common/categories/reducer';
import { INotificationState } from 'client/common/notification/reducer';
import { ILocationStoreState } from '../location/locationInterface';

export interface IRootState {
	modalJuggler: IModalJugglerState;
	user: IUser;
	ads: IAdsState;
	categories: ICategoryState;
	location: ILocationStoreState;
	notification: INotificationState;
}