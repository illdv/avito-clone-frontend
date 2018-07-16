import React from 'react';

require('../../../common/styles/main.sass');
require('./Navbar.sass');

class Navbar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div className="row justify-content-between no-gutters">
                <div className="col-md-8 col-lg-7">
                    <nav className="navbar-expand-lg navbar menu">
                        <a href="" className="navbar-brand logo">
                            <img src="/static/img/logo.svg" alt=""/>
                        </a>
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <a href="#">
                                    Cars
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a href="#">
                                    The property
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#">
                                    Job
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#">
                                    Yet...
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="col-md-4 col-lg-3 text-right">
                    <div className="btn orange-btn">Submit an advertisement</div>
                </div>
            </div>
        )
    }
}

export default Navbar;