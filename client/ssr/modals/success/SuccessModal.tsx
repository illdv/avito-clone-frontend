import * as React from 'react';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import Modal from 'client/common/modal-juggler/Modal';
import { hideAllModal } from 'client/ssr/modals/forgot-password/forgotPasswordModalTriggers';
import { showLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';

interface ISuccess {
}

const SuccessModal: React.SFC<ISuccess> = ({}) => {
	const onClose = () => {
		hideAllModal();
		showLoginModal();
	};
	return (
		<Modal
			name={ModalNames.success}
			useOnRequestClose={true}
		>
			<div className='auth-modal'>
				<div className='login-links d-block text-center no-border'>
					<h1 className='m-b-30'>Well done!</h1>
					<h3 className='grey-text p-x-10'>Your password has been changed <br />successfully</h3>
				</div>
				<div className='login-form'>
					<div className='form-group row auth-input__wrapper'>
						<button
							type='submit'
							className='btn orange-btn big-btn'
							onClick={onClose}
						> Continue
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default SuccessModal;
