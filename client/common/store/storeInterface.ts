import { IModalJugglerState } from '../modal-juggler/modalJugglerInterface';
import user from 'client/common/user/reducer';

export interface IRootState {
	modalJuggler: IModalJugglerState;
	user: IUser;
}