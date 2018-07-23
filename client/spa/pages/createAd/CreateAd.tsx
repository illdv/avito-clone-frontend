import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import { IUserState } from 'client/common/user/reducer';
import Lease from 'client/spa/pages/createAd/Lease';
import { IAds } from 'client/common/ads/interface';
import { ICategory } from 'client/ssr/blocks/categories/interface'
import CategoriesSelector from 'client/spa/pages/createAd/CategoriesSelector'

export interface IAdsDataForCreate {
	id: string;
	fields: {
		title: string;
		description: string;
		price: string;
		phone: string;
	};
	cityId: string;
	lat: number;
	lng: number;
	locationName: string;
}

export interface IProps {
	user?: IUserState;
	onNext: (data: IAdsDataForCreate) => void;
	data: IAds;
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

interface IPropsForInput {
	id: string;
	defaultValue: string;
	title: string;
	inputClass: string;
	onChange: (event) => void;
}

const Input = ({ id, title, onChange, inputClass, defaultValue }: IPropsForInput) => (
	<div className='offer-form__item form-group row no-gutters align-items-center'>
		<label
			htmlFor={id}
			className='col-md-4 offer-form__label'
		>
			{title}
		</label>
		<input
			defaultValue={defaultValue}
			onChange={onChange}
			id={id}
			type='text'
			className={inputClass}
		/>
	</div>
);

const TextArea = ({ id, title, onChange, inputClass, defaultValue }: IPropsForInput) => (
	<div className='offer-form__item form-group row no-gutters align-items-center'>
		<label
			htmlFor={id}
			className='col-md-4 offer-form__label'
		>
			{title}
		</label>
		<textarea
			id={id}
			onChange={onChange}
			className={inputClass}
			defaultValue={defaultValue}
		/>
	</div>
);

class CreateAd extends Component<IProps, IAdsDataForCreate> {

	state: IAdsDataForCreate = {
		id: null,
		fields: {
			title: '',
			description: '',
			price: '',
			phone: '',
		},
		cityId: '',
		locationName: '',
		lat: 0,
		lng: 0,
	};

	onChange = event => {
		const { id, value } = event.target;
		this.setState({
			fields: { ...this.state.fields, [id]: value },
		});
	}

	onSelectPlace = (locationName, cityId, location) => {
		this.setState({
			cityId,
			locationName,
			lat: location.lat(),
			lng: location.lng(),
		});
	}

	onNext = () => {
		this.props.onNext(this.state);
	}

	onSelectCategory = () => {

	}

	static getDerivedStateFromProps(nextProps: IProps, prevState: IAdsDataForCreate): IAdsDataForCreate {

		const { id, price, description, title, latitude, longitude } = nextProps.data;
		if (id !== prevState.id) {
			return {
				id,
				fields: {
					title,
					price,
					description,
					phone: '',
				},
				cityId: '',
				lat: latitude,
				lng: longitude,
				locationName: '',
			};
		}
		return null;
	}

	render() {
		const { email, name }                      = this.props.user.user;
		const { phone, description, price, title } = this.state.fields;
		const { lng, lat }                         = this.state;
		return (
			<section className='page'>
				<div className='container page__container-sm'>
					<div className='row'>
						<div className='col-lg-12'>
							<h3>Submit an advertisement</h3>
						</div>
						<div className='col-lg-7'>
							<div className='submit-contact-info'>
								<h4>Contact information</h4>
								<div className='submit-contact-info__form'>
									<div className='form-group row no-gutters align-items-center'>
										<label
											htmlFor=''
											className='col-md-2'
										>
											Full name
										</label>
										<input
											readOnly
											value={name}
											type='text'
											className='form-control col-md-6'
										/>
									</div>
									<div className='form-group row no-gutters align-items-center'>
										<label
											htmlFor=''
											className='col-md-2'
										>
											Email
										</label>
										<input
											readOnly
											value={email}
											type='email'
											className='form-control col-md-6'
										/>
									</div>
									<div className='form-group row no-gutters align-items-center'>
										<label
											htmlFor=''
											className='col-md-2'
										>
											Phone
										</label>
										<input
											id='phone'
											type='tel'
											className='form-control col-md-6'
											defaultValue={phone}
											onChange={this.onChange}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-lg-12'>
							<h3>Select category</h3>
						</div>
						<div className='col-lg-12'>
							<CategoriesSelector />
						</div>
					</div>
					<div className='row'>
						<div className='col-lg-9 selected-category'>
							<h3 className='selected-category__title'>Select category</h3>
							<div className='breadcrumbs category-breadcrumbs'>
								<ol className='breadcrumb breadcrumb__inner'>
									<li className='breadcrumb-item breadcrumbs__item'><a href='#'> All listings in
										Berlin</a></li>
									<li className='breadcrumb-item breadcrumbs__item'><a href='#'>Real estate</a></li>
									<li className='breadcrumb-item breadcrumbs__item'><a href=''>Apartments</a></li>
									<li className='breadcrumb-item breadcrumbs__item'><a href=''>Sell 3 839</a></li>
								</ol>
							</div>
						</div>
					</div>
					<div className='offer-form'>
						<Input
							defaultValue={title}
							id={'title'}
							title={'Ad title'}
							onChange={this.onChange}
							inputClass={'form-control col-md-6'}
						/>
						<TextArea
							defaultValue={description}
							id={'description'}
							title={'Advertisement description'}
							onChange={this.onChange}
							inputClass={'form-control col-md-6'}
						/>
						<Input
							defaultValue={price}
							id={'price'}
							title={'Price'}
							onChange={this.onChange}
							inputClass={'form-control col-md-3'}
						/>
						<div className='offer-form__item form-group row no-gutters align-items-center'>
							<label
								htmlFor=''
								className='col-md-4 offer-form__label'
							>
								Photo
							</label>
							<div className='offer-form-upload'>
								<input
									type='file'
									className='form-control offer-form-upload__item'
								/>
							</div>
						</div>
						<Lease
							onSelectPlace={this.onSelectPlace}
							onNext={this.onNext}
							defaultValue={{ lat, lng }}
						/>
					</div>
				</div>
			</section>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAd);