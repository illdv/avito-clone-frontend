import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'src/common/store/storeInterface';

export interface IState {
  fields?: {
    email?: string;
    telephone?: string;
    password?: string;
    confirm_password?: string;
  };
}

export interface IProps {

}

class RegistrationForm extends Component<IProps, IState> {

  state: IState = {};

  onChange = event => {
    const { id, value } = event.target;
    this.setState({
      fields: { ...this.state.fields, [id]: value },
    });
  }

  render() {
    return (
      <div>
        <div className='form-group row big-input'>
          <label className='col-sm-5 col-form-label ' htmlFor='email'>Email</label>
          <input
            onChange={this.onChange}
            type='email'
            id='email'
            className='col-sm-6'
            name='email'
            required
            placeholder='Enter email'
            autoComplete='off'
          />
        </div>
        <div className='form-group row big-input'>
          <label
            className='col-sm-5 col-form-label'
            htmlFor='tel'
          >
            Phone
          </label>
          <input
            type='tel'
            onChange={this.onChange}
            id='telephone'
            name='tel'
            className='col-sm-6'
            required
            placeholder='Enter your phone'
            autoComplete='off'
          />
        </div>
        <div className='form-group row big-input'>
          <label
            className='col-sm-5 col-form-label'
            htmlFor='password'
          >
            Password
          </label>
          <input
            onChange={this.onChange}
            type='password'
            id='password'
            name='password'
            className='col-sm-6'
            required
            placeholder='Enter your password'
            autoComplete='off'
          />
        </div>
        <div
          className='form-group row big-input'
        >
          <label
            className='col-sm-5 col-form-label'
            htmlFor='confirm'
          >
            Confirm password
          </label>
          <input
            type='password'
            onChange={this.onChange}
            id='confirm_password'
            name='confirm'
            className='col-sm-6'
            required
            placeholder='Confirm password'
            autoComplete='off'
          />
        </div>
        <div className='form-group col-sm-12 p-x-40 m-t-40'>
          <button className='btn orange-btn big-btn'>
            Register
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  /// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  /*
    onLoadingMail: () => {
     dispatch(Mail.Actions.onLoadingMail.REQUEST());
   },
  */
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
