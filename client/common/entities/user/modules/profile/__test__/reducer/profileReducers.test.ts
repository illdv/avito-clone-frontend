import reducer from '../../reducer';
import { profileActions } from 'client/common/entities/user/modules/profile/actions';

const newState = {
	name: 'Maxim Galkin',
	email: 'konstet@mail.ru',
	phone: '88966633',
	created_at: '2018-08-12',
	updated_at: '2018-08-17',
	image: {
		id: '11',
		imageable_type: 'wtf',
		imageable_id: 5,
		file_name: 'konst',
		file: 'fdfdfdw422.jpg',
		created_at: '2018-08-12',
		updated_at: '2018-08-15',
		file_url: 'stor/files/img/fdfdfdw422.jpg',
	},
};
const initialState = null;

describe('getProfile success reducer', () => {

	it('initial state',() => {
		expect(reducer(undefined, undefined))
			.toEqual(initialState);
	});
	it('User success get profile', () => {
		const action = profileActions.getProfile.SUCCESS(newState);
		expect(reducer(initialState, action))
			.toEqual(newState);

	});
});

describe('changeProfile reducer success', () => {
	it('initial state', () => {
		expect(reducer(undefined, undefined))
			.toEqual(initialState);
	});
	it('User success change setting profile', () => {
		const action = profileActions.changeProfile.SUCCESS(newState);
		expect(reducer(initialState, action))
			.toEqual(newState);
	});
});

describe('setProfile reducer request', () => {
	it('initial state', () => {
		expect(reducer(undefined, undefined))
			.toEqual(initialState);
	});
	it('changeProfile request', () => {
		const action = profileActions.setProfile.REQUEST(newState);
		expect(reducer(initialState, action))
			.toEqual(newState);
	});
});