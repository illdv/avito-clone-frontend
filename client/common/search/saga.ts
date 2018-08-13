import { takeEvery } from 'redux-saga/effects';
import { SearchActions } from 'client/common/search/actions';
import { Action } from 'redux-act';
import { IQuery } from 'client/ssr/contexts/QueryContext';

function* initialization(action: Action<{ query: IQuery }>) {
	try {

	} catch (e) {

	}
}

function* changeSearchData() {
}

function* search() {
}

function* watcherSearch() {
	yield [
		takeEvery(SearchActions.initialization.REQUEST, initialization),
		takeEvery(SearchActions.changeSearchData.REQUEST, changeSearchData),
		takeEvery(SearchActions.search.REQUEST, search),
	];
}

export default [watcherSearch];