import React from 'react';
import { connect } from 'react-redux';

import { showSellerModals } from 'client/ssr/modals/seller/SellerModalTriger';
import { ISeller } from 'client/ssr/blocks/ad/interface';

export const avatar = '/static/img/person.png';

export interface IProps {
	seller: ISeller;
	country: string;
	city: string;
	user: ILoginResponse; // Looking through
}

const mapStateToProps = state => ({
	user: state.user,
});

const Seller = ({ seller, country, city, user }: IProps) => (
	<div className='col-lg-7'>
		<div className='seller d-flex'>
			<div className='d-flex align-items-center'>
				<img
					src={ seller.image && seller.image.file_url || avatar}
					alt=''
					className='round-img m-r-10'
				/>
				<div className='seller-info m-r-15'>
					<span>{seller.name}</span>
					<span>{country + ' ' + city}</span>
				</div>
				<button
					className='btn orange-btn m-x-10'
					onClick={showSellerModals}
				>
					Show phone number
				</button>
				{
					user.user && user.user.id === seller.id // TODO add preloader
					?
						<a
							href={`/profile`} // TODO add id ad
							className='btn orange-btn-outline'
						>
							Edit
						</a>
					:
						<a
							href=''
							className='btn orange-btn-outline'
						>
							To write a message
						</a>
				}
			</div>
		</div>
	</div>
);

export default connect(mapStateToProps)(Seller);