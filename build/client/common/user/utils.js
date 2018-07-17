import { createAction } from 'redux-act';
import { bindActionCreators } from 'redux';
function helperCreateAction(actionName) {
    const type = {
        REQUEST: `${actionName}_REQUEST`,
        SUCCESS: `${actionName}_SUCCESS`,
        FAILURE: `${actionName}_FAILURE`,
    };
    return {
        REQUEST: createAction(type.REQUEST, (payload) => payload),
        SUCCESS: createAction(type.SUCCESS, (payload) => payload),
        FAILURE: createAction(type.FAILURE, (payload) => payload),
    };
}
export function createAsyncAction(actionName) {
    return helperCreateAction(actionName);
}
// TODO: bad name
export const createActionCreator = (reducer) => (actionType) => {
    return createAsyncAction(`${reducer}__${actionType}`);
};
/**
 * Use for map dispatch actions from Module.
 */
export function bindModuleAction(moduleActions, dispatch) {
    return Object.entries(moduleActions).reduce((result, [key, value]) => {
        return { ...result, [key]: bindActionCreators(value, dispatch) };
    }, {});
}
//# sourceMappingURL=utils.js.map