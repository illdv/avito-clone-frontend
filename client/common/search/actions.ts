import { createActionCreator, IAsyncAction } from 'client/common/entities/user/utils';
import { IAds } from 'client/common/entities/user/modules/owned-ads/interfaces';
import { IQuery } from 'client/ssr/contexts/QueryContext';

const createAsyncAction = createActionCreator('SEARCH');

const initialization   = createAsyncAction('INITIALIZATION');
const changeSearchData = createAsyncAction('CHANGE_SEARCH_DATA');
const search           = createAsyncAction('CREATE');

export interface ISearchActions {
	changeSearchData: IAsyncAction<object>;
	search: IAsyncAction<{}, { ads: IAds[] }>;
	initialization: IAsyncAction<{ query: IQuery }, {}>;
}

export const SearchActions: ISearchActions = {
	changeSearchData,
	search,
	initialization,
};