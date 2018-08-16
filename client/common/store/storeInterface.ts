import { IModalJugglerState } from '../modal-juggler/modalJugglerInterface';
import { ILocationStoreState } from '../location/locationInterface';
import { ISearchState } from 'client/common/search/store';

export interface IRootState {
	modalJuggler: IModalJugglerState;
	user: IUserState;
	location: ILocationStoreState;
	search: ISearchState;
}