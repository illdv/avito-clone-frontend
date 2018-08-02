import { createActionCreator, IAsyncAction } from 'client/common/user/utils';
import { ICategory } from 'client/common/categories/interface';

const createAsyncAction = createActionCreator('CATEGORIES');

const loading = createAsyncAction('LOADING');

export const CategoryActions: ICategoryActions = {
	loading,
};

export interface ICategoryActions {
	loading: IAsyncAction<{}, ICategory[]>;
}
