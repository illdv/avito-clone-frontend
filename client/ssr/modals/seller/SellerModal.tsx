import React, { Component } from 'react';
import Modal from '../../../common/modal-juggler/Modal';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { hideSellerModal } from 'client/ssr/modals/seller/SellerModalTriger';
import NumberFormat from 'react-number-format';
import { IAdCity, ISeller } from 'client/ssr/blocks/ad/interface';
import { createAddress } from 'client/ssr/blocks/ad/utils';

require('./SellerModal.sass');

export interface ISellerProps {
	seller: ISeller;
	city: IAdCity;
	address?: string;
}

class SellerModal extends Component<ISellerProps> {
	render() {
		const { seller: { image: { file_url }, name, created_at, phone }, city } = this.props;
		const adAddress = createAddress(city);

		return (
			<Modal
				name={ModalNames.seller}
				useOnRequestClose={true}
			>
				<div className='seller-modal modal-content'>
					<button
						type='button'
						className='auth-modal__close close'
						data-dismiss='modal'
						aria-label='Close'
						onClick={hideSellerModal}
					>
						<span aria-hidden='true'>&times;</span>
					</button>
					<div className='modal-header no-border'>
						<h2
							className='modal-title'
							id='exampleModalLongTitle'
						>
							<NumberFormat
								value={phone}
								displayType={'text'}
								format={'# ### ### ## ##'}
							/>
						</h2>
					</div>
					<div className='modal-body'>
						<div className='seller'>
							<div className='d-flex align-items-center m-r-20'>
								<div className='seller-info'>
									<span className='orange-text'>{name}</span>
									<span className='d-block'>On ADS from {created_at}</span>
								</div>
								<img
									src={file_url}
									alt=''
									className='round-img m-l-20'
								/>
							</div>
							<div className='p-t-20'>
								<span className='grey-text f-w-300'>The contact person</span>
								<span>{name}</span>
							</div>
							<div className='row p-t-20'>
								<div className='col-9'>
									<span className='grey-text'>Address</span>
									<span className='f-w-400'>{adAddress}</span>
								</div>
								<div className='col-3'>
									<a
										href='#'
										className='btn grey-btn-outline seller-modal__button'
									>
										Complain
									</a>
								</div>
							</div>
							<form action='#'>
								<div className='form-inline form-row p-t-40'>
									<div className='form-group col-9'>
										<input
											type='text'
											className='form-control seller-modal__input'
											placeholder='Creative note'
											required
										/>
									</div>
									<div className='form-group col-3'>
										<a
											href='#'
											className='btn grey-btn-outline seller-modal__button'
										>
											Create
										</a>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

export default SellerModal;
