import React from 'react';

import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import Modal from 'client/common/modal-juggler/Modal';
import { hideConfirmationAccountDeletionModal } from './confirmationAccountDeletionModalTriggers';

interface IProps {
	deleteAccountCallback(): void;
}

export class ConformationAccountDeletion extends React.Component<IProps> {

	close = () =>  hideConfirmationAccountDeletionModal();
	
	deleteAccount = () => this.props.deleteAccountCallback();

	render() {
		return (
			<Modal name={ ModalNames.confirmationAccountDeletion } useOnRequestClose={true} autocomplete='off'>
				<div className='modal-content location-modal'>
					<div className='modal-header p-x-20'>
						<h4 className='modal-title' id='exampleModalLongTitle'>Delete your account</h4>
						<button type='button' className='close' onClick={this.close} >
							<span>&times;</span>
						</button>
					</div>
					<div className='modal-body text-center p-y-50 p-x-20'>
						<h5>Are you sure you want to delete your account?</h5>
					</div>
					<div className='modal-footer p-20'>
						<button
							type='button'
							className='btn orange-btn w-50'
							onClick={this.deleteAccount}
						>
								Confirm
						</button>
						<button
							type='button'
							className='btn grey-btn-outline w-50'
							onClick={this.close}
						>
								Cancel
						</button>
					</div>
				</div>
			</Modal>
		);
	}
}

export default ConformationAccountDeletion;
