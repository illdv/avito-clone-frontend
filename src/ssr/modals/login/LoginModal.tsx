import React from 'react';

import Modal from '../../../common/modal-juggler/Modal';
import { showForgotPasswordModal } from '../forgot-password/forgotPasswordModalTriggers';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';

require('./LoginModal.sass');

export enum LoginModalTabs {
    login,
    registration,
}

export interface LoginModalState {
    activeTab: LoginModalTabs;
}

export class LoginModal extends React.Component<{}, LoginModalState> {
    constructor(props){
        super(props);
    }

    state = {
        activeTab: LoginModalTabs.login
    }

    seTactiveTab(tab: LoginModalTabs) {
        this.setState({
            activeTab: tab
        })
    }

    getClassByTabName = (tab: LoginModalTabs) => {
        return tab === this.state.activeTab ? 'active' : '';
    }

    get loginForm() {
        return (
            <form action="#">
                <div className="form-group row big-input">
                    <label className="col-sm-4 col-form-label " htmlFor="first-field">Phone or email</label>
                    <input type="text" id="first-field" className="col-sm-6" name="first-field" required
                        placeholder="Enter email or phone number" autoComplete="off"/>
                </div>
                <div className="form-group row big-input">
                    <label className="col-sm-4 col-form-label " htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="col-sm-6" required
                        placeholder="Enter your password" autoComplete="off"/>
                </div>
                <div className="text-right col-sm-12 p-x-40">
                    <a className="grey-text" onClick={ showForgotPasswordModal }>Forgot Password?</a>
                </div>
                <div className="form-group col-sm-12 p-x-40 d-flex">
                    <input type="checkbox" id="remember" name="password" defaultChecked />
                    <label className="f-s-14 p-x-5" htmlFor="password">Remember me</label>
                </div>
                <div className="form-group col-sm-12 p-x-40 m-t-40">
                    <button type="submit" className="btn orange-btn big-btn"> Login
                    </button>
                </div>
            </form>
        );
    }

    get registrationForm() {
        return (
            <form action="#">
                <div className="form-group row big-input">
                    <label className="col-sm-5 col-form-label " htmlFor="email">Email</label>
                    <input type="email" id="email" className="col-sm-6" name="email" required
                           placeholder="Enter email" autoComplete="off" />
                </div>
                <div className="form-group row big-input">
                    <label className="col-sm-5 col-form-label" htmlFor="tel">Phone</label>
                    <input type="tel" id="tel" name="tel" className="col-sm-6" required
                           placeholder="Enter your phone" autoComplete="off" />
                </div>
                <div className="form-group row big-input">
                    <label className="col-sm-5 col-form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="col-sm-6" required
                           placeholder="Enter your password" autoComplete="off" />
                </div>
                <div className="form-group row big-input">
                    <label className="col-sm-5 col-form-label" htmlFor="confirm">Confirm password</label>
                    <input type="password" id="confirm" name="confirm" className="col-sm-6" required
                           placeholder="Confirm password" autoComplete="off" />
                </div>
                <div className="form-group col-sm-12 p-x-40 m-t-40">
                    <button type="submit" className="btn orange-btn big-btn">
                        Register
                    </button>
                </div>
            </form>
        )
    }

    render() {
        return (
            <Modal name={ ModalNames.login } useOnRequestClose={true} >
                <div className="login-block">
                <div className="login-links">
                    <a
                        className={ `p-x-30 ${ this.getClassByTabName(LoginModalTabs.login) }` }
                        onClick={ () => this.seTactiveTab(LoginModalTabs.login) }
                    >
                        LOGIN
                    </a>
                    <a
                        className={ `p-x-30 ${ this.getClassByTabName(LoginModalTabs.registration) }` }
                        onClick={ () => this.seTactiveTab(LoginModalTabs.registration) }
                    >
                        REGISTER
                    </a>
                </div>
                <div className="login-form">
                    {
                        this.state.activeTab === LoginModalTabs.login
                        ? this.loginForm
                        : this.registrationForm
                    }
                </div>
                </div>
            </Modal>
        )
    }
}

export default LoginModal;