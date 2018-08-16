import { createReducer } from 'redux-act';
import { SearchActions } from 'client/common/search/actions';
import { IQuery } from 'client/common/search/interface';

export interface ISearchState {
	query: IQuery;
	queryString: string;
}

export const defaultState: ISearchState = {
	query: {
		country_id: null,
		region_id: null,
		city_id: null,
		currentPage: null,
		price_from: null,
		whereBetween: {
			price: [],
		},
		whereLike: {
			body: '',
			description: '',
			title: '',
		},
	},
	queryString: '',
};

const reducer = createReducer({}, defaultState);

reducer.on(SearchActions.initialize.REQUEST, (state, payload = defaultState): ISearchState => {
	return {
		...state,
		...payload,
		query: {
			...state.query,
			...payload.query,
		},
	};
});

export default reducer;