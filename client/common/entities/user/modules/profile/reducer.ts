import { createReducer } from 'redux-act';

import { profileActions } from './actions';

const initialState = (): IProfileState => (null);

const reducer = createReducer({}, initialState());

reducer.on(
	profileActions.getProfile.SUCCESS,
	(state: IProfileState, { favorites_ids, ...profileInfo }: IGetProfileResponse): IProfileState => profileInfo,
);

reducer.on(
	profileActions.changeProfile.SUCCESS,
	(state, { favorites_ids, ...profileInfo }): IProfileState => profileInfo,
);

reducer.on(
	profileActions.setProfile.REQUEST,
	(state, profileInfo): IProfileState => profileInfo,
);

export default reducer;
