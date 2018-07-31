import { createReducer } from 'redux-act';

import { ProfileActions } from './actions';

const initialState = (): IUserProfile => (null);

const reducer = createReducer({}, initialState());

reducer.on(
	ProfileActions.getProfile.SUCCESS,
	(state: IUserProfile, { favorites_ids, ...profileInfo }: IGetProfileResponse): IUserProfile => profileInfo,
);

reducer.on(
	ProfileActions.changeProfile.SUCCESS,
	(state, { favorites_ids, ...profileInfo }): IUserProfile => profileInfo,
);

export default reducer;
