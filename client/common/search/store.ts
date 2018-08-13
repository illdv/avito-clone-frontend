import { createReducer } from 'redux-act';
import { SearchActions } from 'client/common/search/actions';

export interface ISearchState {

}

const defaultState: ISearchState = {
};

const reducer = createReducer({}, defaultState);

reducer.on(SearchActions.changeSearchData.REQUEST, (state, payload = defaultState): ISearchState => ({
	...state,
	...payload,
}));

reducer.on(SearchActions.changeSearchData.REQUEST, (state, payload): ISearchState => ({
	...state,
	...payload,
}));