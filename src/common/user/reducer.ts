import { createReducer } from 'redux-act';
import { UserActions } from 'src/common/user/actions';

export interface IUserState {
  user: IUser;
}

const initialState = (): IUserState => ({
  user: null,
});

const reducer = createReducer({}, initialState());

reducer.on(UserActions.login.SUCCESS, (state, payload): IUserState => ({
  ...state,
  user: payload,
}));

export default reducer;
