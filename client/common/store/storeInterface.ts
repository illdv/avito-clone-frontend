import { IModalJugglerState } from '../modal-juggler/modalJugglerInterface';

export interface IRootState {
	modalJuggler: IModalJugglerState;
	user: IUser;
	ads: IUser;
}