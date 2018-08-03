import reducer from '../../reducer';
import { tokenActions } from 'client/common/entities/user/modules/token/actions';

const token = '1124242';
const initalState = null;

describe('SET TOKEN REDUCER', () => {
	it('initial state', () => {
		expect(reducer(undefined, undefined))
			.toEqual(initalState);
	});

	it('SET_TOKEN_TO_STATE_REQUEST', () => {
		const action = tokenActions.setTokenToState.REQUEST({token: token});
		expect(reducer(initalState, action))
			.toEqual(token);
	});
});