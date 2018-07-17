import React, { Component } from 'react';
import { showSellerModals } from 'src/ssr/modals/seller/SellerModalTriger'

export interface ISeller {
   user: object,
}

class Seller extends Component<ISeller, {}> {
    render() {
        return (
            <div className="col-lg-7">
                <div className="seller d-flex">
                    <div className="d-flex align-items-center m-r-15">
                        <img src={this.props.user.avatar} alt="" className="round-img m-r-10"/>
                            <div className="seller-info">
                                <span>{this.props.user.name}</span>
                                <span>{this.props.user.address}</span>
                            </div>
                    </div>
                    <button className="btn orange-btn no-b-r m-x-10" onClick={showSellerModals}>Show phone number</button>
                    <a href="" className="btn orange-btn-outline no-b-r l-h-2">To write a message</a>
                </div>
            </div>
        )
    }
}
export default Seller;