import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../common/modal-juggler/Modal';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';
import { InitialModalProps } from '../../../common/modal-juggler/Modal';
import { getModals } from '../../../common/store/selectors';
import { hide } from '../../../common/modal-juggler/module';
import RegistrationForm from '../../../ssr/modals/auth/components/RegistrationForm';
import LoginForm from '../../../ssr/modals/auth/components/LoginForm';

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

export default (props: InitialModalProps) => {
  const Component = connect(mapStateToProps, mapDispatchToProps)(AuthModal);
  return <Component {...props} />;
};

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
