import React from 'react';
import { connect } from 'react-redux';
import { bindModuleAction } from 'client/common/user/utils';
import { UserActions } from 'client/common/user/actions';
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    userActions: bindModuleAction(UserActions, dispatch),
});
class LoginForm extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            fields: {
                email: 'dev@cronix.ms',
                password: '111111',
            },
            isRememberMe: true,
        };
        this.onChange = event => {
            const { id, value } = event.target;
            this.setState({
                fields: { ...this.state.fields, [id]: value },
            });
        };
        this.onRememberMe = event => {
            this.setState({
                isRememberMe: event.target.checked,
            });
        };
        this.onLogin = () => {
            const { email, password } = this.state.fields;
            this.props.userActions.login.REQUEST({
                email,
                password,
            });
        };
    }
    render() {
        return (<div>
                <div className='form-group row big-input'>
                    <label className='col-sm-4 col-form-label ' htmlFor='first-field'>
                        Phone or email
                    </label>
                    <input required type='text' id='email' className='col-sm-6' placeholder='Enter email or phone number' autoComplete='off' value={this.state.fields.email} onChange={this.onChange}/>
                </div>
                <div className='form-group row big-input'>
                    <label className='col-sm-4 col-form-label' htmlFor='password'>
                        Password
                    </label>
                    <input required type='password' id='password' name='password' className='col-sm-6' placeholder='Enter your password' autoComplete='off' value={this.state.fields.password} onChange={this.onChange}/>
                </div>
                <div className='text-right col-sm-12 p-x-40'>
                    <a className='grey-text'>Forgot Password?</a>
                </div>
                <div className='form-group col-sm-12 p-x-40 d-flex'>
                    <input type='checkbox' id='remember' onChange={this.onRememberMe}/>
                    <label className='f-s-14 p-x-5' htmlFor='password'>
                        Remember me
                    </label>
                </div>
                <div className='form-group col-sm-12 p-x-40 m-t-40'>
                    <button className='btn orange-btn big-btn' onClick={this.onLogin}>
                        Login
                    </button>
                </div>
            </div>);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
//# sourceMappingURL=LoginForm.jsx.map