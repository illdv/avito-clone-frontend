import React from 'react';
import { connect } from 'react-redux';

import { ModalNames } from 'src/common/modal-juggler/modalJugglerInterface';
import { getModals } from 'src/common/store/selectors';
import { hide } from 'src/common/modal-juggler/module';
import Modal from 'src/common/modal-juggler/Modal';
import LoginForm from 'src/ssr/modals/auth/components/LoginForm';
import RegistrationForm from 'src/ssr/modals/auth/components/RegistrationForm';

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
  constructor(props) {
    super(props);
  }

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

  render() {
    return (
      <Modal name={ModalNames.login} useOnRequestClose={true}>
        <div className='login-block'>
          <div className='login-links'>
            <a
              className={`p-x-30 ${ this.getClassByTabName(LoginModalTabs.login) }`}
              onClick={this.onLogin}
            >
              LOGIN
            </a>
            <a
              className={`p-x-30 ${ this.getClassByTabName(LoginModalTabs.registration) }`}
              onClick={this.onRegister}
            >
              REGISTER
            </a>
          </div>
          <div className='login-form'>
            {
              this.state.activeTab === LoginModalTabs.login
                ? <LoginForm/>
                : <RegistrationForm />
            }
          </div>
        </div>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
