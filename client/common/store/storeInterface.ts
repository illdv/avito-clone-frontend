import { IModalJugglerState } from '../modal-juggler/modalJugglerInterface';
import { IUserState } from 'client/common/user/reducer';
import { IAdsState } from 'client/common/ads/reducer';

export interface IRootState {
	modalJuggler: IModalJugglerState;
	user: IUserState;
	ads: IAdsState;
}