import reducer from '../../reducer';
import { profileActions } from 'client/common/entities/user/modules/profile/actions';

const newState = {
	name: 'Maxim Galkin',
	email: 'konstet@mail.ru',
	phone: '88966633',
	created_at: '2018-08-12',
	updated_at: '2018-08-17',
	favorites_ids: [],
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
	// it('User success change settings profile', () => {
	// 	const action = profileActions.getProfile.SUCCESS(newState)
	// 	expect(reducer(action, newState )).toEqual(newState)
	// });
});