import React from 'react';
import Modal from '../../../common/modal-juggler/Modal';
import {ModalNames} from '../../../common/modal-juggler/modalJugglerInterface';
import {IUserActions, UserActions} from 'client/common/user/actions';
import {bindModuleAction} from 'client/common/user/utils';
import {connect, Dispatch} from 'react-redux';

export interface IProps {
	userActions: IUserActions;
}

export interface IState {
	fields: {
		email: string;
		code: string;
		password: string;
		password_confirmation: string;
	};
}

class ResetPasswordModal extends React.Component<IProps & IState> {
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
	}
	onSubmit = () => {
		const {email, code, password, password_confirmation} = this.state.fields;
		this.props.userActions.resetPasswordByCode.REQUEST({email, token: code, password, password_confirmation});
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<Modal
				name={ModalNames.forgotPassword}
				useOnRequestClose={true}
			>
				<div className='auth-modal'>
					<div className='text-center p-40'>
						<h1 className='m-b-30'>Reset password</h1>
						<h4 className='grey-text p-x-10'>Enter your email address, secret code and new password</h4>
					</div>
					<div className='login-form'>
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
								className='col-sm-6'
								name='email'
								required
								placeholder='Enter email'
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
								className='col-sm-6'
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
								className='col-sm-6'
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
								className='col-sm-6'
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

const mapDispatchToProps = dispatch => ({
	userActions: bindModuleAction(UserActions, dispatch),
});
export default connect(null, mapDispatchToProps)(ResetPasswordModal);