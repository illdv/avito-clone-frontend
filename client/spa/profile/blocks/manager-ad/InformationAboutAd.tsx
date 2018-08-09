import React, { ChangeEvent } from 'react';

import CategoriesSelector from './CategoriesSelector';
import { ImageSelector } from './ImageSelector'; // TODO Rename Images
import { IOption } from './interface';

import {
	AdInfoFieldsNames, IAdInfoFields, IAttachedImage, ILocation, ISellerInfoFields,
	SellerFieldsNames,
} from '../../interfaces/managerAd';
import CategoryOptions from './CategoryOptions';
import SelectorAdType from './CategoryTypeSelector';
import LocationSelect from 'client/ssr/blocks/search/components/LocationSelect';

interface IProps {
	defaultCategoryId: number;
	attachedImages: IAttachedImage[];
	adInfoFields: IAdInfoFields;
	selectedCategories: ICategory[];
	sellerInfoFields: ISellerInfoFields;
	location: ILocation;
	categories: ICategory[];
	options: IOption[];
	selectedType: number;
	typeIds: number[];

	deleteImage(index: number): void;

	onSelectTypeAd(id: number): void;

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
	title: string;
	inputClass: string;

	onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

const Input = ({ id, title, type = 'text', onChange, inputClass, value }: IPropsForInput) => (
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
				onChange={onChange}
				className='form-control'
			/>
		</div>
	</div>
);

const TextArea = ({ id, title, onChange, inputClass, value }: IPropsForInput) => (
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
				onChange={onChange}
				className='form-control'
			/>
		</div>
	</div>
);

const InformationAboutAd = ({ sellerInfoFields, adInfoFields, categories, createtorChangeAdInfoField, selectedCategories, onSelectCategories, attachedImages, onUpdateImages, deleteImage, defaultCategoryId, createtorChangeSellerInfoField, location, options, selectedType, typeIds, onSelectTypeAd, creatorChangeOptionById, onSelectLocation}: IProps) => (
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
					onChange={createtorChangeAdInfoField(AdInfoFieldsNames.title)}
				/>
				<TextArea
					id={'description'}
					title={'Advertisement description'}
					inputClass={'col-md-9 col-lg-6'}
					value={adInfoFields.description.value}
					onChange={createtorChangeAdInfoField(AdInfoFieldsNames.description)}
				/>
				<Input
					id={'price'}
					title={'Price'}
					type='number'
					inputClass={'col-md-3'}
					value={adInfoFields.price.value}
					onChange={createtorChangeAdInfoField(AdInfoFieldsNames.price)}
				/>
				{/*<div className='offer-form__item form-group row align-items-center'>*/}
					{/*<label*/}
						{/*htmlFor='location'*/}
						{/*className='col-md-3 col-lg-4 offer-form__label'*/}
					{/*>*/}
						{/*Select location*/}
					{/*</label>*/}
					{/*<div className='col-md-9 col-lg-6'>*/}
						{/*<LocationSelect city_id={adInfoFields.city_id.value}/>*/}
					{/*</div>*/}
				{/*</div>*/}
				<Input
					id={'address'}
					title={'Address'}
					inputClass={'col-md-9 col-lg-6'}
					value={adInfoFields.address.value}
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
				{/* <Lease
					onSelectLocation={ onSelectLocation }
					location={ location }
				/> */}
			</div>
		</div>
	</section>
);

export default InformationAboutAd;