import React, { Component } from 'react';
import Modal from '../../../common/modal-juggler/Modal';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { hideSellerModal } from 'client/ssr/modals/seller/SellerModalTriger';
import NumberFormat from 'react-number-format';
import { ISeller } from 'client/ssr/blocks/ad/interface'

require('./SellerModal.sass');


class SellerModal extends Component<ISeller> {
	render() {
		return (
			<Modal
				name={ModalNames.seller}
				useOnRequestClose={true}
			>
				<div className='modal-content'>
					<div className='modal-header no-border'>
						<h3
							className='modal-title'
							id='exampleModalLongTitle'
						>
							<NumberFormat
								value={this.props.user.phone}
								displayType={'text'}
								format={'# ### ### ## ##'}
							/>
						</h3>
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
							<div className='d-flex align-items-center m-r-15'>
								<div className='seller-info'>
									<span className='orange-text'>{this.props.user.name}</span>
									<span className='d-block'>On ADS from {this.props.user.created_at}</span>
									<span>Completed 3 ads</span>
								</div>
								<img
									src='/static/img/person.png'
									alt=''
									className='round-img m-l-20'
								/>
							</div>
							<div className='p-t-20'>
						<span className='grey-text f-w-300'>
							The contact person
						</span>
								<span>
							Alex
						</span>

							</div>
							<div className='p-t-20 d-flex justify-content-between'>
						<span>
							<span className='grey-text'>Address</span>
								<span className='f-w-400'>
							Octyabrskaya 24
						</span>
						</span>

								<a
									href='#'
									className='btn grey-btn-outline no-b-r'
								>
									Complain
								</a>
							</div>
							<div className='p-t-40'>
								<form action='#'>
									<div className='form-group d-flex'>
										<input
											type='text'
											className='form-control no-b-r m-r-10'
											placeholder='Creative note'
											required
										/>
										<a
											href='#'
											className='btn grey-btn-outline no-b-r'
										>
											Create
										</a>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className='modal-footerno-border' />
				</div>
			</Modal>
		);
	}
}

export default SellerModal;
