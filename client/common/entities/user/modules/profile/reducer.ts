import { createReducer } from 'redux-act';

import { profileActions } from './actions';

const initialState = (): IUserProfile => (null);

const reducer = createReducer({}, initialState());

reducer.on(
	profileActions.getProfile.SUCCESS,
	(state: IUserProfile, { favorites_ids, ...profileInfo }: IGetProfileResponse): IUserProfile => profileInfo,
);

reducer.on(
	profileActions.changeProfile.SUCCESS,
	(state, { favorites_ids, ...profileInfo }): IUserProfile => profileInfo,
);

export default reducer;
