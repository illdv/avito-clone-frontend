import React, { Component } from 'react';
import { showSellerModals } from 'client/ssr/modals/seller/SellerModalTriger';
import { ISeller } from 'client/ssr/blocks/ad/interface';

export const avatar = '/static/img/person.png';

export interface IProps {
	seller: ISeller;
	country: string;
	city: string;
}

class Seller extends Component<IProps> {
	render() {
		return (
			<div className='col-lg-7'>
				<div className='seller d-flex'>
					<div className='d-flex align-items-center'>
						<img
							src={avatar}
							alt=''
							className='round-img m-r-10'
						/>
						<div className='seller-info m-r-15'>
							<span>{this.props.seller.name}</span>
							<span>{this.props.country + ' ' + this.props.city}</span>
						</div>
						<button
							className='btn orange-btn m-x-10'
							onClick={showSellerModals}
						>
							Show phone number
						</button>
						<a
							href=''
							className='btn orange-btn-outline'
						>
							To write a message
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Seller;