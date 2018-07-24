import React, {Component} from 'react';
import Modal from '../../../common/modal-juggler/Modal';
import {ModalNames} from 'client/common/modal-juggler/modalJugglerInterface';
import {hideSellerModal} from 'client/ssr/modals/seller/SellerModalTriger';
import NumberFormat from 'react-number-format';
import { ISeller } from 'client/ssr/blocks/ad/interface';

require('./SellerModal.sass');

export interface ISellerProps {
	seller: ISeller;
}

class SellerModal extends Component<ISellerProps> {
	render() {
		return (
			<Modal
				name={ModalNames.seller}
				useOnRequestClose={true}
			>
				<div className='seller-modal'>
					<div className='modal-header no-border'>
						<h2
							className='modal-title'
							id='exampleModalLongTitle'
						>
							<NumberFormat
								value={this.props.seller.phone}
								displayType={'text'}
								format={'# ### ### ## ##'}
							/>
						</h2>
						<button
							type='button'
							className='close'
							data-dismiss='modal'
							aria-label='Close'
							onClick={hideSellerModal}
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className='modal-body'>
						<div className='seller'>
							<div className='d-flex align-items-center m-r-20'>
								<div className='seller-info'>
									<span className='orange-text'>{this.props.seller.name}</span>
									<span className='d-block'>On ADS from {this.props.seller.created_at}</span>
									<span>Completed 3 ads</span>
								</div>
								<img
									src='/static/img/person.png'
									alt=''
									className='round-img m-l-20'
								/>
							</div>
							<div className='p-t-20'>
								<span className='grey-text f-w-300'>The contact person</span>
								<span>Alex</span>
							</div>
							<div className='row p-t-20'>
								<div className='col-9'>
									<span className='grey-text'>Address</span>
									<span className='f-w-400'>Octyabrskaya 24</span>
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
