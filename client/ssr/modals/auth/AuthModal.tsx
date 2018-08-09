import React from 'react';
import {connect} from 'react-redux';

import Modal from 'client/common/modal-juggler/Modal';
import LoginForm from 'client/ssr/modals/auth/components/LoginForm';
import RegistrationForm from 'client/ssr/modals/auth/components/RegistrationForm';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { getModals } from 'client/common/store/selectors';
import { hide } from 'client/common/modal-juggler/module';
import { hideLoginModal } from './loginModalTriggers';

require('./AuthModal.sass');

export enum LoginModalTabs {
	login,
	registration,
}

export interface ILoginModalState {
	activeTab: LoginModalTabs;
}

const mapStateToProps = state => ({
	modals: getModals(state),
});

const mapDispatchToProps = dispatch => ({
	hide: name => dispatch(hide(name)),
});

export class AuthModal extends React.Component<{}, ILoginModalState> {

	state = {
		activeTab: LoginModalTabs.login,
	};

	setActiveTab(tab: LoginModalTabs) {
		this.setState({
			activeTab: tab,
		});
	}

	getClassByTabName = (tab: LoginModalTabs) => {
		return tab === this.state.activeTab ? 'active' : '';
	}

	onLogin = () => {
		this.setActiveTab(LoginModalTabs.login);
	}

	onRegister = () => {
		this.setActiveTab(LoginModalTabs.registration);
	}

	close = () => hideLoginModal();

	render() {
		return (
			<Modal name={ModalNames.login} useOnRequestClose={true}>
				<div className='auth-modal'>
					<div className='auth-links'>
						<a
							className={`auth-link ${ this.getClassByTabName(LoginModalTabs.login) }`}
							onClick={this.onLogin}
						>
							LOGIN
						</a>
						<a
							className={`auth-link ${ this.getClassByTabName(LoginModalTabs.registration) }`}
							onClick={this.onRegister}
						>
							REGISTER
						</a>
						<button
							type='button'
							className='auth-modal__close close'
							onClick={this.close}
						>
							<span>&times;</span>
						</button>
					</div>
					{
						this.state.activeTab === LoginModalTabs.login
							? <LoginForm/>
							: <RegistrationForm/>
					}
				</div>
			</Modal>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
