import React, {Component} from 'react';

import LoginModal from '../../modals/auth/AuthModal';
import ForgotPasswordModal from '../../modals/forgot-password/ForgotPasswordModal';
import LanguageDropdown from './components/LanguageDropdown';
import { showLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';
import { ToastContainer } from 'react-toastify';

require('../../../common/styles/main.sass');
require('./Header.sass');

class  Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <LoginModal />
                <ForgotPasswordModal />
                <div className="header header_top p-y-22 navbar-expand-sm">
                    <div className='container'>
                        <div className='row justify-content-between no-gutters'>
                            <div className='col-sm-6 col-md-4'>
                                <ul className='navbar-nav'>
                                    <li className='nav-item'>
                                        <a href="#" className="header__location">
                                            <i className="header__icon fas fa-map-marker-alt" />
                                            <span>Berlin</span>
                                        </a>
                                    </li>
                                    <LanguageDropdown/>
                                </ul>
                            </div>
                            <div className="col-md-4 navbar-expand-sm text-right">
                                <ul className="navbar-nav justify-content-end">
                                    <li className="nav-item">
                                        <a href="#" className="header__favourites p-x-40">
                                            <img src="/static/img/icons/like.svg" alt=""/>
                                            <span>Favourites</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <button className='header__button_login' onClick={showLoginModal}>
                                            Login
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
