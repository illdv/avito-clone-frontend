import { createActionCreator, IAsyncAction } from 'client/common/entities/user/utils';
import { IAds } from 'client/common/entities/user/modules/owned-ads/interfaces';
import { IQuery } from 'client/common/search/interface';

const createAsyncAction = createActionCreator('SEARCH');

const initialize   = createAsyncAction('INITIALIZE');
const changeSearchData = createAsyncAction('CHANGE_SEARCH_DATA');
const search           = createAsyncAction('CREATE');

export interface ISearchActions {
	changeSearchData: IAsyncAction<object>;
	search: IAsyncAction<{}, { ads: IAds[] }>;
	initialize: IAsyncAction<{ query: IQuery, queryString: string }, {}>;
}

export const SearchActions: ISearchActions = {
	changeSearchData,
	search,
	initialize,
};