import { ComplexActionCreator1, createAction } from 'redux-act';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

export interface IAsyncAction<R = {}, S = {}, F = IPayloadError> extends ActionCreatorsMapObject {
	REQUEST: ComplexActionCreator1<R, R>;
	SUCCESS: ComplexActionCreator1<S, S>;
	FAILURE: ComplexActionCreator1<F, F>;
}

export interface IPayloadError {
	error?: string;
}

function helperCreateAction<R, S, F>(actionName: string): IAsyncAction<R, S, F> {
	const type = {
		REQUEST: `${actionName}_REQUEST`,
		SUCCESS: `${actionName}_SUCCESS`,
		FAILURE: `${actionName}_FAILURE`,
	};

	return {
		REQUEST: createAction(type.REQUEST, (payload: R) => payload),
		SUCCESS: createAction(type.SUCCESS, (payload: S) => payload),
		FAILURE: createAction(type.FAILURE, (payload: F) => payload),
	};
}

export function createAsyncAction<R, S>(actionName: string): IAsyncAction<R, S, IPayloadError> {
	return helperCreateAction<R, S, IPayloadError>(actionName);
}

// TODO: bad name
export const createActionCreator = (reducer: string) => (actionType: string) => {
	return createAsyncAction<any, any>(`${reducer}__${actionType}`);
};

/**
 * Use for map dispatch actions from Module.
 */
export function bindModuleAction(moduleActions: any, dispatch: any): ActionCreatorsMapObject {
	return Object.entries(moduleActions).reduce((result, [key, value]): ActionCreatorsMapObject => {
		return { ...result, [key]: bindActionCreators(value as any, dispatch) };
	}, {});
}
