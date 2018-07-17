import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindModuleAction } from 'src/common/user/utils';
import { IUserActions, UserActions } from 'src/common/user/actions';

export interface IState {
    fields?: {
        email?: string;
        password?: string;
    };
    isRememberMe: boolean;
}

export interface IProps {
    userActions?: IUserActions;
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    userActions: bindModuleAction(UserActions, dispatch),
});

class LoginForm extends React.Component<IProps, IState> {

    state: IState = {
        fields: {
            email: 'dev@cronix.ms',
            password: '111111',
        },
        isRememberMe: true,
    };

    onChange = event => {
        const { id, value } = event.target;
        this.setState({
            fields: { ...this.state.fields, [id]: value },
        });
    }

    onRememberMe = event => {
        this.setState({
            isRememberMe: event.target.checked,
        });
    }

    onLogin = () => {
        const { email, password } = this.state.fields;
        this.props.userActions.login.REQUEST({
            email,
            password,
        });
    }

    render() {
        return (
            <div>
                <div className='form-group row big-input'>
                    <label
                        className='col-sm-4 col-form-label '
                        htmlFor='first-field'
                    >
                        Phone or email
                    </label>
                    <input
                        required
                        type='text'
                        id='email'
                        className='col-sm-6'
                        placeholder='Enter email or phone number'
                        autoComplete='off'
                        value={this.state.fields.email}
                        onChange={this.onChange}
                    />
                </div>
                <div className='form-group row big-input'>
                    <label
                        className='col-sm-4 col-form-label'
                        htmlFor='password'
                    >
                        Password
                    </label>
                    <input
                        required
                        type='password'
                        id='password'
                        name='password'
                        className='col-sm-6'
                        placeholder='Enter your password'
                        autoComplete='off'
                        value={this.state.fields.password}
                        onChange={this.onChange}
                    />
                </div>
                <div className='text-right col-sm-12 p-x-40'>
                    <a className='grey-text'>Forgot Password?</a>
                </div>
                <div className='form-group col-sm-12 p-x-40 d-flex'>
                    <input
                        type='checkbox'
                        id='remember'
                        onChange={this.onRememberMe}
                    />
                    <label
                        className='f-s-14 p-x-5'
                        htmlFor='password'
                    >
                        Remember me
                    </label>
                </div>
                <div className='form-group col-sm-12 p-x-40 m-t-40'>
                    <button
                        className='btn orange-btn big-btn'
                        onClick={this.onLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
