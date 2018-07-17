import { createReducer } from 'redux-act';
import { UserActions } from 'client/common/user/actions';
const initialState = () => ({
    user: null,
});
const reducer = createReducer({}, initialState());
reducer.on(UserActions.login.SUCCESS, (state, payload) => ({
    ...state,
    user: payload,
}));
export default reducer;
//# sourceMappingURL=reducer.js.map