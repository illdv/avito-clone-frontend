import React from 'react';
import Modal from '../../../common/modal-juggler/Modal';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';

require('./LoginModal.sass')

class LoginModal extends React.PureComponent {
    render() {
        return (
            <Modal name={ ModalNames.login } useOnRequestClose={true} >
                <div className="login-block">
                <div className="login-links">
                    <a className="active p-x-30">LOGIN</a>
                    <a className="p-x-30">REGISTER</a>
                </div>
                <div className="login-form">
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
                        <a className="grey-text">Forgot Password?</a>
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
                </div>
                </div>
            </Modal>
        )
    }
}

export default LoginModal;