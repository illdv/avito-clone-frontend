import { IModalJugglerState } from '../modal-juggler/modalJugglerInterface';
import { ILocationStoreState } from '../location/locationInterface';

export interface IRootState {
	modalJuggler: IModalJugglerState;
	user: IUser;
	location: ILocationStoreState;
}