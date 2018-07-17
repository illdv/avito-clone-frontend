import React, {Component} from 'react';

require('./Types.sass');

class Types extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 list-of-types">
                            <ul className="list-unstyled">
                                <li>
                                    <a href="">
                                        <span>Apartments</span>
                                    </a>
                                    <span>45 000</span>
                                </li>
                                <li>
                                    <a href="">
                            <span>
                        Houses
                            </span>
                                    </a>
                                    <span>45 000</span>
                                </li>
                                <li>
                                    <a href="">
                            <span>
                            Daily rent of apartments</span>
                                    </a>
                                    <span>45 000</span></li>
                                <li><a href=""><span>
                        Plots of land</span></a>
                                    <span>45 000</span></li>
                                <li><a href=""><span>Garages and parking places</span></a>
                                    <span>45 000</span></li>
                                <li><a href=""><span>
                        Daily rent of apartments</span></a>
                                    <span>45 000</span></li>
                                <li><a href=""><span>Rooms</span></a>
                                    <span>45 000</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Types;
