import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from '../../../../common/store/storeInterface';

export interface IState {

}

export interface IProps {

}

class RegistrationForm extends Component<IProps, IState> {

  state: IState = {};

  render() {
    return (
      <form action='#'>
        <div className='form-group row big-input'>
          <label className='col-sm-5 col-form-label ' htmlFor='email'>Email</label>
          <input
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
            id='tel'
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
            id='confirm'
            name='confirm'
            className='col-sm-6'
            required
            placeholder='Confirm password'
            autoComplete='off'
          />
        </div>
        <div className='form-group col-sm-12 p-x-40 m-t-40'>
          <button type='submit' className='btn orange-btn big-btn'>
            Register
          </button>
        </div>
      </form>
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
