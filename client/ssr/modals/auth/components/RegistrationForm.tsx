import * as React from 'react';
import {Component} from 'react';
import {connect, Dispatch} from 'react-redux';
import {IUserActions, UserActions} from 'client/common/user/actions';
import {bindModuleAction} from 'client/common/user/utils';

export interface IState {
	fields: {
		email: string;
		phone: string;
		name: string;
		password: string;
		password_confirmation: string;
	};
}

export interface IProps {
	userActions?: IUserActions;
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	userActions: bindModuleAction(UserActions, dispatch),
});

interface IInputProps {
	id: string;
	title: string;
	placeholder: string;
	type?: string;
	onChange: (event) => void;
}

const Input = ({id, title, onChange, placeholder, type}: IInputProps) => (
	<div className='form-group row auth-input__wrapper'>
		<label
			className='col-sm-5 col-form-label '
			htmlFor={id}
		>
			{title}
		</label>
		<input
			type={type || 'text'}
			required
			id={id}
			autoComplete='off'
			className='col-sm-6'
			onChange={this.onChange}
			placeholder={placeholder}
		/>
	</div>
);

class RegistrationForm extends Component<IProps, IState> {

	state: IState = {
		fields: {
			email: '',
			phone: '',
			name: '',
			password: '',
			password_confirmation: '',
		},
	};

	onChange = event => {
		const {id, value} = event.target;
		this.setState({
			fields: {...this.state.fields, [id]: value},
		});
	}

	onRegistration = () => {
		this.props.userActions.register.REQUEST({...this.state.fields});
	}

	render() {
		return (
			<div className='login-form'>
				<Input
					title='Email'
					id='email'
					placeholder='Enter email'
					onChange={this.onChange}
				/>
				<Input
					title='Name'
					id='name'
					placeholder='Enter your name'
					onChange={this.onChange}
				/>
				<Input
					title='Phone'
					id='tel'
					placeholder='Enter your phone'
					onChange={this.onChange}
				/>
				<Input
					title='Password'
					type='password'
					id='password'
					placeholder='Enter your password'
					onChange={this.onChange}
				/>
				<Input
					title='Confirm password'
					id='password_confirmation'
					type='password'
					placeholder='Confirm password'
					onChange={this.onChange}
				/>
				<div className='auth-btn__container p-t-40'>
					<button
						onClick={this.onRegistration}
						className='btn orange-btn auth-btn'
					>
						Register
					</button>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
