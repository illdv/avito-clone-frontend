import React from 'react';
import Modal from '../../../common/modal-juggler/Modal';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';
import { UserActions } from '../../../common/entities/user/rootActions';

export interface IState {
	fields: {
		email: string;
		code: string;
		password: string;
		password_confirmation: string;
	};
}

class ResetPasswordModal extends React.Component<null, IState> {
	state: IState = {
		fields: {
			email: '',
			code: '',
			password: '',
			password_confirmation: '',
		},
	};

	onChange = event => {
		const {id, value} = event.target;
		this.setState({
			fields: {...this.state.fields, [id]: value},
		});
	};

	onSubmit = () => {
		const {email, code, password, password_confirmation} = this.state.fields;
		UserActions.common.resetPasswordByCode.REQUEST({email, token: code, password, password_confirmation});
	};

	shouldComponentUpdate() {
		return false;
	};

	render() {
		return (
			<Modal
				name={ModalNames.forgotPassword}
				useOnRequestClose={true}
			>
				<div className='auth-modal'>
					<button
						type='button'
						className='auth-modal__close close'
						// onClick={this.close}
					>
						<span>&times;</span>
					</button>
					<div className='text-center p-40'>
						<h1 className='m-b-30'>Reset password</h1>
						<h4 className='grey-text p-x-10'>Enter your email address, secret code and new password</h4>
					</div>
					<div className='auth-form'>
						<div className='form-group row auth-input__wrapper'>
							<label
								className='col-sm-5 col-form-label'
								htmlFor='email'
							>
								Email
							</label>
							<input
								onChange={this.onChange}
								type='email'
								id='email'
								className='col-sm-6 form-control'
								name='email'
								required
								placeholder='Enter email'
								autoComplete='off'
							/>
						</div>
						<div className='form-group row auth-input__wrapper'>
							<label
								className='col-sm-5 col-form-label'
								htmlFor='tel'
							>
								Secret code
							</label>
							<input
								type='tel'
								onChange={this.onChange}
								id='code'
								name='tel'
								className='col-sm-6 form-control'
								required
								placeholder='Enter your secret code'
								autoComplete='off'
							/>
						</div>
						<div className='form-group row auth-input__wrapper'>
							<label
								className='col-sm-5 col-form-label'
								htmlFor='password'
							>
								New password
							</label>
							<input
								onChange={this.onChange}
								type='password'
								id='password'
								name='password'
								className='col-sm-6 form-control'
								required
								placeholder='Enter your new password'
								autoComplete='off'
							/>
						</div>
						<div
							className='form-group row auth-input__wrapper'
						>
							<label
								className='col-sm-5 col-form-label'
								htmlFor='confirm'
							>
								Confirm new password
							</label>
							<input
								type='password'
								onChange={this.onChange}
								id='password_confirmation'
								name='confirm'
								className='col-sm-6 form-control'
								required
								placeholder='Confirm new password'
								autoComplete='off'
							/>
						</div>
						<div className='auth-modal-btn__container'>
							<button
								className='btn orange-btn auth-modal-btn'
								onClick={this.onSubmit}
							> Confirm
							</button>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

export default ResetPasswordModal;