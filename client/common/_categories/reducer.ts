import { createReducer } from 'redux-act';

import { ICategory } from 'client/common/categories/interface';
import { CategoryActions } from 'client/common/categories/actions';

export interface ICategoryState {
	data: ICategory[];
	isLoading: boolean;
}

const initialState = (): ICategoryState => ({
	data: [],
	isLoading: false,
});

const reducer = createReducer({}, initialState());

reducer.on(CategoryActions.loading.REQUEST, (state, payload): ICategoryState => ({
	...state,
	isLoading: true,
}));

reducer.on(CategoryActions.loading.SUCCESS, (state, payload): ICategoryState => ({
	...state,
	data: payload,
	isLoading: false,
}));

reducer.on(CategoryActions.loading.FAILURE, (state, payload): ICategoryState => ({
	...state,
	isLoading: false,
}));

export default reducer;
