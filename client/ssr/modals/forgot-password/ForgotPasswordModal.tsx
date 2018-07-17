import React from 'react';
import Modal from '../../../common/modal-juggler/Modal';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';

class ForgotPasswordModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Modal name={ ModalNames.forgotPassword } useOnRequestClose={true} >
                <div className="login-block">
                    <div className="login-links d-block text-center">
                    <h1 className="m-b-30">Forgot password?</h1>
                        <h4 className="grey-text p-x-10">Enter the email address associated <br /> with the account to reset your password</h4>
                    </div>
                    <div className="login-form">
                        <form action="#">
                            <div className="form-group row big-input">
                                <label className="col-sm-4 col-form-label " htmlFor="first-field">Phone or email</label>
                                <input type="text" id="first-field" className="col-sm-6" name="first-field" required
                                    placeholder="Enter email or phone number" autoComplete="off" />
                            </div>
                            <div className="form-group col-sm-12 p-x-40 m-t-40">
                                <button type="submit" className="btn orange-btn big-btn"> Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default ForgotPasswordModal;