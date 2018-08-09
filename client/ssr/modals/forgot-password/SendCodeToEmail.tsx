import React from 'react';
import Modal from '../../../common/modal-juggler/Modal';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';
import { IUserActions, UserActions } from 'client/common/entities/user/rootActions';
import { bindModuleAction } from 'client/common/entities/user/utils';
import { connect, Dispatch } from 'react-redux';
import { hideSendCodeToEmailModal } from './forgotPasswordModalTriggers';

export interface IState {
	email: string;
}

class SendCodeToEmail extends React.Component<null, IState> {
	state = {
		email: '',
	};
	onHandle = event => {
		// TODO: Add Validation
		const value = event.target.value;
		this.setState({email: value});
	}
	onSubmit = e => {
		if (this.state.email) {
			UserActions.common.sendCode.REQUEST({email: this.state.email});
		}
	}

	shouldComponentUpdate() {
		return false;
	}

	close = () => hideSendCodeToEmailModal();

	render() {
		return (
			<Modal
				name={ModalNames.sendCodeToEmail}
				useOnRequestClose={true}
			>
				<div className='auth-modal'>
					<button
						type='button'
						className='auth-modal__close close'
						onClick={this.close}
					>
						<span>&times;</span>
					</button>
					<div className='text-center p-40'>
						<h2 className='m-b-30'>Forgot password?</h2>
						<h4 className='grey-text m-b-0'>
							Enter the email address associated<br/>
							with the account to reset your password
						</h4>
					</div>
					<div className='auth-form'>
						<div className='form-group row auth-input__wrapper forgot-password-input__wrapper'>
							<label
								className='col-sm-4 col-form-label'
								htmlFor='first-field'
							>
								Phone or email
							</label>
							<input
								type='text'
								id='first-field'
								className='col-sm-6'
								name='first-field'
								required
								placeholder='Enter email or phone number'
								autoComplete='off'
								onChange={this.onHandle}
							/>
						</div>
						<div className='auth-modal-btn__container'>
							<button
								className='btn orange-btn auth-modal-btn'
								onClick={this.onSubmit}
							> Send
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
export default connect(null, mapDispatchToProps)(SendCodeToEmail);