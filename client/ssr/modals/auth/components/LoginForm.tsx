import React from 'react';
import { UserActions } from 'client/common/entities/user/rootActions';
import { showSendCodeToEmailModal } from 'client/ssr/modals/forgot-password/forgotPasswordModalTriggers';
import { hideLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';

export interface IState {
	fields?: {
		email?: string;
		password?: string;
	};
	isRememberMe: boolean;
}

class LoginForm extends React.Component<null, IState> {
	state: IState = {
		fields: {
			email: '',
			password: '',
		},
		isRememberMe: true,
	};

	onChange = event => {
		const { id, value } = event.target;
		this.setState({
			fields: { ...this.state.fields, [id]: value },
		});
	}

	onRememberMe = event => {
		this.setState({
			isRememberMe: event.target.checked,
		});
	}

	onLogin = () => {
		const { email, password } = this.state.fields;
		const { isRememberMe }    = this.state;

		UserActions.common.login.REQUEST({
			email,
			password,
			isRememberMe,
		});
	}

	onForgot = () => {
		hideLoginModal();
		showSendCodeToEmailModal();
	}

	render() {
		return (
			<div className='auth-form'>
				<div className='form-group row auth-input__wrapper'>
					<label
						className='col-sm-4 col-form-label'
						htmlFor='first-field'
					>
						Phone or email
					</label>
					<input
						required
						type='text'
						id='email'
						className='col-sm-6'
						placeholder='Enter email or phone number'
						autoComplete='off'
						value={this.state.fields.email}
						onChange={this.onChange}
					/>
				</div>
				<div className='form-group row auth-input__wrapper'>
					<label
						className='col-sm-4 col-form-label'
						htmlFor='password'
					>
						Password
					</label>
					<input
						required
						type='password'
						id='password'
						name='password'
						className='col-sm-6'
						placeholder='Enter your password'
						autoComplete='off'
						value={this.state.fields.password}
						onChange={this.onChange}
					/>
				</div>
				<div className='row auth-input__wrapper'>
					<div className='text-right col-12'>
						<a
							className='grey-text'
							onClick={this.onForgot}
						>
							Forgot Password?
						</a>
					</div>
					<div className='d-flex col-12'>
						<input
							className='auth-form__remember'
							type='checkbox'
							id='remember'
							onChange={this.onRememberMe}
						/>
						<label
							className='f-s-14 p-x-5'
							htmlFor='remember'
						>
							Remember me
						</label>
					</div>
				</div>
				<div className='auth-modal-btn__container p-t-0'>
					<button
						className='btn orange-btn auth-modal-btn'
						onClick={this.onLogin}
					>
						Login
					</button>
				</div>
			</div>
		);
	}
}

export default LoginForm;
