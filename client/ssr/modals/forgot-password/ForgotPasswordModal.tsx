import React from 'react';
import Modal from '../../../common/modal-juggler/Modal';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';
import { IUserActions, UserActions } from 'client/common/user/actions'
import { bindModuleAction } from 'client/common/user/utils'
import { connect, Dispatch } from 'react-redux';

export interface IProps {
    userActions: IUserActions;
}

export interface IState {
    email: string
}

class ForgotPasswordModal extends React.Component<IProps & IState> {
    state    = {
        email: ''
    }
    onHandle = event => {
        // TODO: Add Validation
        const value = event.target.value;
        this.setState({ email: value });
    }
    onSubmit = () => {
        if (this.state.email) {
            this.props.userActions.sendCode.REQUEST({ email: this.state.email })
        }
    }

    shouldComponentUpdate(){
        return false;
    }
     componentDidMount() {
        console.log('ljl')
     }
    render() {
        return (
            <Modal
                name={ModalNames.forgotPassword}
                useOnRequestClose={true}
            >
                <div className="login-block">
                    <div className="login-links d-block text-center">
                        <h1 className="m-b-30">Forgot password?</h1>
                        <h4 className="grey-text p-x-10">Enter the email address associated
                            <br />
                            with the account to reset your password</h4>
                    </div>
                    <div className="login-form">
                        <form action="#">
                            <div className="form-group row big-input">
                                <label
                                    className="col-sm-4 col-form-label "
                                    htmlFor="first-field"
                                >
                                    Phone or email</label>
                                <input
                                    type="text"
                                    id="first-field"
                                    className="col-sm-6"
                                    name="first-field"
                                    required
                                    placeholder="Enter email or phone number"
                                    autoComplete="off"
                                    onChange={this.onHandle}
                                />
                            </div>
                            <div className="form-group col-sm-12 p-x-40 m-t-40">
                                <button
                                    type="submit"
                                    className="btn orange-btn big-btn"
                                    onClick={this.onSubmit}
                                > Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userActions: bindModuleAction(UserActions, dispatch),
});
export default connect(null, mapDispatchToProps)(ForgotPasswordModal);