import React, { Component } from 'react';

export interface IVehicleDescription {
    body: string,
}

class VehicleDescription extends Component<IVehicleDescription> {
    render() {
        return (
            <div className="row">
                <div className="col-md-12 col-lg-10 ">
                    <h3 className="caption p-b-30">
                        Vehicle Description
                    </h3>
                    <span>
                        {this.props.body}
                </span>
                </div>
            </div>

        )
    }
}

export default VehicleDescription;