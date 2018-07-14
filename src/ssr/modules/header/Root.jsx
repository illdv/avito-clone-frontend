import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

require('../../../common/styles/main.sass');
require('./Root.sass');

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <header>
                <div className="top-header p-y-22 navbar-expand-sm">
                    <div className="container">
                        <div className="row justify-content-between no-gutters">
                            <div className="col-sm-6 col-md-4">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a href="#" className="location">
                                            <i className="fas fa-map-marker-alt"></i>
                                            <span>Berlin</span>
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a href="#" className="language p-x-40" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="underline">English</span>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <a className="dropdown-item" href="#">English</a>
                                            <a className="dropdown-item" href="#">German</a>
                                            <a className="dropdown-item" href="#">Arab</a>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <div className="col-md-4 navbar-expand-sm text-right">
                                <ul className="navbar-nav justify-content-end">
                                    <li className="nav-item">
                                        <a href="#" className="favourites p-x-40">
                                            <img src="../images/icons/like.svg" alt="" />
                                            <span>Favourites</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="login.html">
                                            Login
                                        </a>
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
