import React, { Component } from 'react';
import { showSellerModals } from 'client/ssr/modals/seller/SellerModalTriger';
import { ISeller } from 'client/ssr/blocks/ad/interface';

export const avatar   = '/static/img/person.png';

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
					<div className='d-flex align-items-center m-r-15'>
						<img
							src={avatar}
							alt=''
							className='round-img m-r-10'
						/>
						<div className='seller-info'>
							<span>{this.props.seller.name}</span>
							<span>{this.props.country + ' ' + this.props.city}</span>
						</div>
					</div>
					<button
						className='btn orange-btn no-b-r m-x-10'
						onClick={showSellerModals}
					>
						Show phone number
					</button>
					<a
						href=''
						className='btn orange-btn-outline no-b-r l-h-2'
					>
						To write a message
					</a>
				</div>
			</div>
		);
	}
}

export default Seller;