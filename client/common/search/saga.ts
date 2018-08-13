import { takeEvery } from 'redux-saga/effects';
import { SearchActions } from 'client/common/search/actions';

function* changeSearchData() {
}

function* search() {
}

function* watcherSearch() {
	yield [
		takeEvery(SearchActions.changeSearchData.REQUEST, changeSearchData),
		takeEvery(SearchActions.search.REQUEST, search),
	];
}

export default [watcherSearch];