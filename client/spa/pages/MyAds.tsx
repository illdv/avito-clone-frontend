import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';

export interface IState {

}

export interface IProps {

}

const mapStateToProps = (state: IRootState) => ({
	/// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	/*
	  onLoadingMail: () => {
	   dispatch(Mail.Actions.onLoadingMail.REQUEST());
	 },
	*/
});

export class MyAds extends Component<IProps, IState> {

	state: IState = {};

	render() {
		return (
			<>
				<div className='filter-offer d-flex'>
					<div className='filter-offer__item'>
						<a
							href=''
							className='filter-offer__link'
						>
							Disapproved
						</a>
						<span className='text_count-category'>1</span>
					</div>
					<div className='filter-offer__item'>
						<a
							href=''
							className='filter-offer__link'
						>
							Active
						</a>
						<span className='text_count-category'>1</span>
					</div>
					<div className='filter-offer__item'>
						<a
							href=''
							className='filter-offer__link link-active'
						>
							Completed
						</a>
						<span className='text_count-category'>1</span>
					</div>
				</div>
				<div className='remove-offer'>
					<input type='checkbox' />
					<button className='btn button button_dark-outline remove-offer__button w-25'>
						Active
					</button>
					<button className='btn button button_dark-outline w-25 remove-offer__button'>
						Remove
					</button>
				</div>
				<div className='offer-block'>
					<div className='offer-block__item'>
						<input type='checkbox' />
						<div className='offer-block__inner'>
							<div className='row no-gutters'>
								<div className='col-md-3 col-lg-3'>
									<img
										src='/static/img/ads/ads3.png'
										alt=''
										className='offer-block__img'
									/>
								</div>
								<div className='col-md-6 col-lg-6'>
									<a
										href='#'
										className='f-s-16'
									>
										<h5>
											House of 230 m²
										</h5>
									</a>
									<span className='d-inline-block offer-block__price'>790 000 $</span>
									<div className='publish-offer'>
										<a
											href='#'
											className='btn button button_dark-outline publish-offer__button'
										>
											Activate
										</a>
										<a
											href='#'
											className='btn button button_dark-outline publish-offer__button'
										>
											Remove
										</a>
									</div>
								</div>
								<div className='col-md-3 col-lg-3 text-right edit-block'>
									<a
										href='#'
										className='edit-block__link'
									>
										Edit
									</a>
									<div className='watcher'>
										<i className='watcher__icon fa fa-eye' /> <span>5647</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='offer-block__item'>
						<input type='checkbox' />
						<div className='offer-block__inner'>
							<div className='row no-gutters'>
								<div className='col-md-3 col-lg-3'>
									<img
										src='/static/img/ads/ads3.png'
										alt=''
										className='offer-block__img'
									/>
								</div>
								<div className='col-md-6 col-lg-6'>
									<a
										href='#'
										className='f-s-16'
									>
										<h5>
											House of 230 m²
										</h5>
									</a>
									<span className='d-inline-block offer-block__price'>790 000 $</span>
									<div className='publish-offer'>
										<a
											href='#'
											className='btn button button_dark-outline publish-offer__button'
										>
											Edit
										</a>
									</div>
								</div>
								<div className='col-md-3 col-lg-3 text-right edit-block'>
									<a
										href='#'
										className='edit-block__link'
									>
										Edit
									</a>
									<div className='watcher'>
										<i className='watcher__icon fa fa-eye' />
										<span>5647</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='offer-block__item'>
						<input type='checkbox' />
						<div className='offer-block__inner'>
							<div className='row no-gutters'>
								<div className='col-md-3 col-lg-3'>
									<img
										src='/static/img/ads/ads3.png'
										alt=''
										className='offer-block__img'
									/>
								</div>
								<div className='col-md-6 col-lg-6'>
									<a
										href='#'
										className='f-s-16'
									>
										<h5>
											House of 230 m²
										</h5>
									</a>
									<span className='d-inline-block offer-block__price'>790 000 $</span>
									<div className='publish-offer'>
										<a
											href='#'
											className='btn button button_dark-outline publish-offer__button'
										>
											Complete
										</a>
										<a
											href='#'
											className='btn button button_dark-outline publish-offer__button'
										>
											Remove
										</a>
									</div>
								</div>
								<div className='col-md-3 col-lg-3 text-right edit-block'>
									<a
										href='#'
										className='edit-block__link'
									>
										Edit
									</a>
									<div className='watcher'>
										<i className='watcher__icon fa fa-eye' /> <span>5647</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAds);