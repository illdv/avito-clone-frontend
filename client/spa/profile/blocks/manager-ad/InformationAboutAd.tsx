import React, { ChangeEvent } from 'react';

import CategoriesSelector from './CategoriesSelector';
import { ImageSelector } from './ImageSelector'; // TODO Rename Images
import { IOption } from './interface';
import { connect } from 'react-redux';

import {
	AdInfoFieldsNames, IAdInfoFields, IAttachedImage, ILocation, ISellerInfoFields,
	SellerFieldsNames,
} from '../../interfaces/managerAd';
import CategoryOptions from './CategoryOptions';
import SelectorAdType from './CategoryTypeSelector';
import { ILoaded } from 'client/common/location/locationInterface';
import SelectorLocationByAd from 'client/spa/profile/blocks/manager-ad/SelectorLocationByAd';

interface IProps {
	defaultCategoryId: number;
	attachedImages: IAttachedImage[];
	adInfoFields: IAdInfoFields;
	selectedCategories: ICategory[];
	selectedCategoriesError: ISelectedCategoriesError;
	sellerInfoFields: ISellerInfoFields;
	location: ILocation;
	categories: ICategory[];
	options: IOption[];
	selectedType: number;
	typeIds: number[];
	loadedLocation: ILoaded;

	deleteImage(index: number): void;

	onSelectTypeAd(id: number): void;

	onSelectCityAd(city_id: number, title?: string): (e: ChangeEvent<HTMLInputElement>) => void;

	onSelectLocation(location: ILocation): void;

	onUpdateImages(images: IAttachedImage[]): void;

	onSelectCategories(categories: ICategory[]): void;

	creatorChangeOptionById(id: number): (e: ChangeEvent<HTMLInputElement>) => void;

	createtorChangeAdInfoField(name: AdInfoFieldsNames): (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

	createtorChangeSellerInfoField(name: SellerFieldsNames): (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface IPropsForInput {
	id: string;
	type?: string;
	value: string;
	error: string;
	title: string;
	inputClass: string;

	onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

const Input = ({ id, title, type = 'text', onChange, inputClass, value, error }: IPropsForInput) => (
	<div className='offer-form__item form-group row align-items-center'>
		<label
			htmlFor={id}
			className='col-md-3 col-lg-4 offer-form__label'
		>
			{title}
		</label>
		<div className={inputClass}>
			<input
				id={id}
				type={type}
				value={value}
				placeholder={error}
				onChange={onChange}
				className={'form-control'}
				style={error === '' ? {border: '1px solid silver'} : {border: '1px solid red'}}
			/>
		</div>
	</div>
);

const TextArea = ({ id, title, onChange, inputClass, value, error }: IPropsForInput) => (
	<div className='offer-form__item form-group row align-items-center'>
		<label
			htmlFor={id}
			className='col-md-3 col-lg-4 offer-form__label'
		>
			{title}
		</label>
		<div className={inputClass}>
			<textarea
				id={id}
				value={value}
				placeholder={error}
				onChange={onChange}
				style={error === '' ? {border: '1px solid silver'} : {border: '1px solid red'}}
				className='form-control'
			/>
		</div>
	</div>
);

const InformationAboutAd = ({ sellerInfoFields, adInfoFields, categories, createtorChangeAdInfoField,
								selectedCategories, selectedCategoriesError, onSelectCategories, attachedImages,
								onUpdateImages, deleteImage, defaultCategoryId, createtorChangeSellerInfoField,
								location, options, selectedType, typeIds, onSelectTypeAd, creatorChangeOptionById,
								onSelectLocation, loadedLocation, onSelectCityAd}: IProps) => (
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
							<div className='form-group row align-items-center'>
								<label
									htmlFor=''
									className='col-md-2'
								>
									Full name
								</label>
								<div className='col-md-6'>
									<input
										type='text'
										className='form-control'
										value={sellerInfoFields.name.value}
										disabled={sellerInfoFields.name.disable}
									/>
								</div>
							</div>
							<div className='form-group row align-items-center'>
								<label
									htmlFor=''
									className='col-md-2'
								>
									Email
								</label>
								<div className='col-md-6'>
									<input
										readOnly
										type='email'
										className='form-control'
										value={sellerInfoFields.email.value}
										disabled={sellerInfoFields.email.disable}
									/>
								</div>
							</div>
							<div className='form-group row align-items-center'>
								<label
									htmlFor=''
									className='col-md-2'
								>
									Phone
								</label>
								<div className='col-md-6'>
									<input
										id='phone'
										type='tel'
										className='form-control'
										value={sellerInfoFields.phone.value}
										disabled={sellerInfoFields.phone.disable}
										onChange={createtorChangeSellerInfoField(SellerFieldsNames.phone)}
									/>
								</div>
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
					<CategoriesSelector
						categories={categories}
						defaultCategoryId={defaultCategoryId}
						selectedCategories={selectedCategories}
						selectedCategoriesError={selectedCategoriesError}
						onSelectCategories={onSelectCategories}
					/>
				</div>
			</div>
			{/* <div className='row'>
				<div className='col-lg-9 selected-category'>
					<h3 className='selected-category__title'>Select category</h3>
					<div
						className='breadcrumbs category-breadcrumbs'
						style={{ width: '100%' }}
					>
						<ol className='breadcrumb breadcrumb__inner'>
							{
								selectedCategories.map((category, index) => (
									<li
										key={index}
										className='breadcrumb-item breadcrumbs__item'
									>
										<a href=''>{ category.title }</a>
									</li>
								))
							}
						</ol>
					</div>
				</div>
			</div> */}

			<CategoryOptions
				options={options}
				creatorChangeOptionById={creatorChangeOptionById}
			/>

			{
				typeIds.length > 0 &&
				<SelectorAdType
					typeIds={typeIds}
					selectedType={selectedType}
					onSelectTypeAd={onSelectTypeAd}
				/>
			}

			<div className='offer-form'>
				<Input
					id={'title'}
					title={'Ad title'}
					inputClass={'col-md-9 col-lg-6'}
					value={adInfoFields.title.value}
					error={adInfoFields.title.error}
					onChange={createtorChangeAdInfoField(AdInfoFieldsNames.title)}
				/>
				<TextArea
					id={'description'}
					title={'Advertisement description'}
					inputClass={'col-md-9 col-lg-6'}
					value={adInfoFields.description.value}
					error={adInfoFields.description.error}
					onChange={createtorChangeAdInfoField(AdInfoFieldsNames.description)}
				/>
				<Input
					id={'price'}
					title={'Price'}
					type='number'
					inputClass={'col-md-3'}
					value={adInfoFields.price.value}
					error={adInfoFields.price.error}
					onChange={createtorChangeAdInfoField(AdInfoFieldsNames.price)}
				/>
				<SelectorLocationByAd
					location={loadedLocation}
					onChange={onSelectCityAd(AdInfoFieldsNames.city_id)}
					currentCity={adInfoFields.city_id.value}
					error={adInfoFields.city_id.error}
				/>
				<Input
					id={'address'}
					title={'Address'}
					inputClass={'col-md-9 col-lg-6'}
					value={adInfoFields.address.value}
					error={adInfoFields.address.error}
					onChange={createtorChangeAdInfoField(AdInfoFieldsNames.address)}
				/>
				<div className='offer-form__item form-group row align-items-center'>
					<label
						htmlFor=''
						className='col-md-3 col-lg-4 offer-form__label'
					>
						Photo
					</label>
					<div className='col-md-9 col-lg-6'>
						<ImageSelector
							attachedImages={attachedImages}
							onUpdateImages={onUpdateImages}
							deleteImage={deleteImage}
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
);

export default InformationAboutAd;