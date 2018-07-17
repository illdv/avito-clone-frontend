import React, { Component } from 'react';
import thunk from 'redux-thunk'

export interface IVehicle {
    options: object,
}
let  fields = []

class Vehicle extends Component<IVehicle, {}> {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className="col-lg-5">
                <h3 className="caption">Vehicle Features</h3>
                {this.props.options.map((option) =>
                    <ul
                        className="list-unstyled f-s-14 ads-features"
                        key={option.id}
                    >
                        {formationFields(option)}
                        {fields.map((field) =>
                            <li key={field}>
                                <span className="grey-text">{field}</span>: <span>{option[field]}</span>
                            </li>
                        )}

                    </ul>
                )}
            </div>
        )
    }
}

function formationFields(option)
{
 fields = Object.keys(option);
}

export default Vehicle;