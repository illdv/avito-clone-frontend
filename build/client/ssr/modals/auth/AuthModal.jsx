import React from 'react';
import { connect } from 'react-redux';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { getModals } from 'client/common/store/selectors';
import { hide } from 'client/common/modal-juggler/module';
import Modal from 'client/common/modal-juggler/Modal';
import LoginForm from 'client/ssr/modals/auth/components/LoginForm';
import RegistrationForm from 'client/ssr/modals/auth/components/RegistrationForm';
require('./AuthModal.sass');
export var LoginModalTabs;
(function (LoginModalTabs) {
    LoginModalTabs[LoginModalTabs["login"] = 0] = "login";
    LoginModalTabs[LoginModalTabs["registration"] = 1] = "registration";
})(LoginModalTabs || (LoginModalTabs = {}));
const mapStateToProps = state => ({
    modals: getModals(state),
});
const mapDispatchToProps = dispatch => ({
    hide: name => dispatch(hide(name)),
});
export class AuthModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: LoginModalTabs.login,
        };
        this.getClassByTabName = (tab) => {
            return tab === this.state.activeTab ? 'active' : '';
        };
        this.onLogin = () => {
            this.setActiveTab(LoginModalTabs.login);
        };
        this.onRegister = () => {
            this.setActiveTab(LoginModalTabs.registration);
        };
    }
    setActiveTab(tab) {
        this.setState({
            activeTab: tab,
        });
    }
    render() {
        return (<Modal name={ModalNames.login} useOnRequestClose={true}>
        <div className='login-block'>
          <div className='login-links'>
            <a className={`p-x-30 ${this.getClassByTabName(LoginModalTabs.login)}`} onClick={this.onLogin}>
              LOGIN
            </a>
            <a className={`p-x-30 ${this.getClassByTabName(LoginModalTabs.registration)}`} onClick={this.onRegister}>
              REGISTER
            </a>
          </div>
          <div className='login-form'>
            {this.state.activeTab === LoginModalTabs.login
            ? <LoginForm />
            : <RegistrationForm />}
          </div>
        </div>
      </Modal>);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
//# sourceMappingURL=AuthModal.jsx.map