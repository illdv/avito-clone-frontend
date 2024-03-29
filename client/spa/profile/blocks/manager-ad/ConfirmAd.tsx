import * as React from 'react';

export interface IProps {
	selectedCategories: ICategory[];
	email: string;
	phone: string;
	fullName: string;
	locationName: string;
	title: string;
	price: string;
	description: string;
	address: string;
	next(): void;
	back(): void;
	vip(e): void;
	isEditing: boolean;
}

const ConfirmAd = ({
	selectedCategories,
	fullName,
	email,
	phone,
	locationName,
	title,
	price,
	description,
	address,
	vip,
	next,
	back,
	isEditing,
}: IProps) => {
	const category = selectedCategories.map(item => item.title).join('/');

	return (
		<section className='page'>
			<div className='container page__container-sm'>
				<div className='row'>
					<div className='col-lg-12'>
						<h3>Check the announcement before posting</h3>
					</div>
					<div className='col-md-12 col-lg-10 col-xl-7 confirm-offer-block'>
						<div className='confirm-contact-info'>
							<h4 className='confirm-contact-info__title'>Contact information</h4>
							<div>
								<div className='confirm-contact-info__item row align-items-center'>
									<span className='col-md-4'>Full name</span>
									<span className='col-md-6'>{fullName}</span>
								</div>
								<div className='confirm-contact-info__item row align-items-center'>
									<span className='col-md-4'>Email</span>
									<span className='col-md-6'>{email}</span>
								</div>
								<div className='confirm-contact-info__item row align-items-center'>
									<span className='col-md-4'>Phone</span>
									<span className='col-md-6'>{phone}</span>
								</div>
							</div>
						</div>
						<div className='confirm-offer-info'>
							<h4 className='confirm-offer-info__title'>Ad information</h4>
							<div>
								<div className='confirm-offer-info__item row align-items-center'>
									<span className='col-md-4'>City</span>
									<span className='col-md-6'>{locationName}</span>
								</div>
								<div className='confirm-offer-info__item row align-items-center'>
									<span className='col-md-4'>Title Ad</span>
									<span className='col-md-6'>{title}</span>
								</div>
								<div className='confirm-offer-info__item row align-items-center'>
									<span className='col-md-4'>Category</span>
									<span className='col-md-6'>{category}</span>
								</div>
								<div className='confirm-offer-info__item row align-items-center'>
									<span className='col-md-4'>Place of inspection</span>
									<span className='col-md-6'>{locationName}</span>
								</div>
								<div className='confirm-offer-info__item row align-items-center'>
									<span className='col-md-4'>Price</span>
									<span className='col-md-6'>{price}</span>
								</div>
								<div className='confirm-offer-info__item row align-items-center'>
									<span className='col-md-4'>Ad Description</span>
									<span className='col-md-6'>{description}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-12 col-lg-10 col-xl-7 page-confirmation'>
						{
							!isEditing &&
								<>
									<h4>Choose service</h4>
									<div className='service-block'>
										<div className='service-block__item row'>
											<div className='col-md-1'>
												<input
													readOnly
													type='radio'
													name='service'
													value={'Free'}
													defaultChecked
													className='service-block__check'
													onChange={vip}
												/>
											</div>
											<div className='service-block__info col-md-6'>
												<h5>Free</h5>
												<span className='d-block'>Free advertisement submission</span>
												<span className='d-block service-block__period'>Effective 7 days</span>
											</div>
											<div className='service-block__price col-md-5'>
												<h5>0$</h5>
												<span className='price__discount'>A discount</span>
											</div>
										</div>
										<div className='service-block__item row'>
											<div className='col-md-1'>
												<input
													readOnly
													type='radio'
													name='service'
													value={'Quick'}
													className='service-block__check'
													onChange={vip}
												/>
											</div>
											<div className='service-block__info col-md-6'>
												<h5>Quick sale</h5>
												<span className='d-block'>10 times as many impressions</span>
												<span className='d-block service-block__period'>Effective 7 days</span>
											</div>
											<div className='service-block__price col-md-5'>
												<h5>27$</h5>
												<span className='price__discount'>A discount</span>
											</div>
										</div>
										<div className='service-block__item row'>
											<div className='col-md-1'>
												<input
													readOnly
													type='radio'
													name='service'
													value={'Turbo'}
													className='service-block__check'
													onChange={vip}
												/>
											</div>
											<div className='service-block__info col-md-6'>
												<h5>Turbo</h5>
												<span className='d-block'>10 times as many impressions</span>
												<span className='d-block service-block__period'>Effective 14 days</span>
											</div>
											<div className='service-block__price col-md-5'>
												<h5>47$</h5>
												<span className='price__discount'>A discount</span>
											</div>
										</div>
									</div>
								</>
						}
						<div className='text-right'>
							<a
								onClick={back}
								className='btn grey-btn-outline button_confirm'
							>
								<i className='fa fa-arrow-left'/>
								Back
							</a>
							<a
								onClick={next}
								className='btn orange-btn button_confirm'
							>
								Submit an advertisement
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ConfirmAd;