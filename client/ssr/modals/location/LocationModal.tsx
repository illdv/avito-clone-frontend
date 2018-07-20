import React from 'react';
import { connect } from 'react-redux';

import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { getModals } from 'client/common/store/selectors';
import { hide } from 'client/common/modal-juggler/module';
import Modal from 'client/common/modal-juggler/Modal';

export enum LocationModalTabs {
	login,
	registration,
}

export interface ILocationModalState {
	activeTab: LocationModalTabs;
}

const mapStateToProps = state => ({
	modals: getModals(state),
});

const mapDispatchToProps = dispatch => ({
	hide: name => dispatch(hide(name)),
});

export class LocationModal extends React.Component<{}, ILocationModalState> {
    

	render() {
		return (
			<Modal name={ModalNames.location} useOnRequestClose={true}>
				<div className='login-block'>
					<div className='login-links'>
						<a
							className={`p-x-30`}
						>
							SET LOCATION
						</a>
					</div>
					<div className='login-form'>

					</div>
				</div>
			</Modal>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationModal);
