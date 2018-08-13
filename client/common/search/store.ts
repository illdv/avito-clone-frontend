import { createReducer } from 'redux-act';
import { SearchActions } from 'client/common/search/actions';
import { IQuery } from 'client/common/search/interface';

export interface ISearchState {
	query: IQuery;
}

const defaultState: ISearchState = {
	query: {
		country_id: null,
		region_id: null,
		city_id: null,
		search: null,
		currentPage: null,
		price_from: null,
	},
};

const reducer = createReducer({}, defaultState);

reducer.on(SearchActions.initialize.REQUEST, (state, payload = defaultState): ISearchState => ({
	...state,
	...payload,
}));

export default  reducer;