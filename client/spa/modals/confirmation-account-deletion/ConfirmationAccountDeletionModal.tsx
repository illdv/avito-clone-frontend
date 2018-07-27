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
					<div className='modal-header'>
						<h4 className='modal-title' id='exampleModalLongTitle'>Confirmation</h4>
						<button type='button' className='close' onClick={this.close} >
							<span>&times;</span>
						</button>
					</div>
					<div className='modal-body '>
						<h1>Body</h1>
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn button orange-btn w-100'
							onClick={this.deleteAccount}
						>
								Delete account
						</button>
					</div>
				</div>
			</Modal>
		);
	}
}

export default ConformationAccountDeletion;
