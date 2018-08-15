import React, { ChangeEvent } from 'react';
import { connect, Dispatch } from 'react-redux';

import InformationAboutAd from './InformationAboutAd';
import { IRootState } from 'client/common/store/storeInterface';
import ConfirmAd from './ConfirmAd';
import { transformationAdToManagerState, getSelectAdTypeIdsBySelectedCategories } from '../../utils/createAd';

import {
	ISellerInfoFields,
	IAdInfoFields,
	IAttachedImage,
	ILocation,
	AdInfoFieldsNames,
	SellerFieldsNames,
} from '../../interfaces/managerAd';
import { UserActions } from 'client/common/entities/user/rootActions';
import { getCategories } from 'client/ssr/blocks/categories/context';
import { IOption } from './interface';

interface IProps {
	initialAd?: IAd;
	user: IUserState;
	categories: ICategory[];
	callback(state: IState): void;
}

export interface IState {
	step: number;
	sellerInfoFields: ISellerInfoFields;
	adInfoFields: IAdInfoFields;
	selectedCategories: ICategory[];
	attachedImages: IAttachedImage[];
	defaultCategoryId: number;
	location: ILocation;
	options: IOption[];
	isVip: number;
	typeIds: number[];
	selectedType: number;
	selectedCategoriesError: string;
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

const findFieldAtPossibleNull = (obj, key, defaultValue) => {
	return obj && obj[key] || defaultValue;
}

class ManagerAd extends React.Component<IProps, IState> {
	constructor(props, context) {
		super(props, context);

		const sellerInfoFields = {
			name: { disable: true, value: findFieldAtPossibleNull(this.props.user.profile, 'name', '') },
			email: { disable: true, value: findFieldAtPossibleNull(this.props.user.profile, 'email', '') },
			phone: { disable: false, value: findFieldAtPossibleNull(this.props.user.profile, 'phone', '') },
		};

		if (this.props.initialAd) {
			// Edit Ad
			this.state = transformationAdToManagerState(this.props.initialAd, this.props.categories, sellerInfoFields);
		} else {
			// Create Ad
			// @ts-ignore
            this.state = {
				step: 1,
				sellerInfoFields,
				adInfoFields: {
					title: { disable: false, value: '', error: '' },
					price: { disable: false, value: '', error: '' },
					description: { disable: false, value: '', error: '' },
					address: { disable: false, value: '', error: '' },
					city_id: {value: ''},
				},
				selectedCategories: [],
				attachedImages: [],
				defaultCategoryId: null,
				location: {
					id: null,
					name: null,
					lng: 55.75222,
					lat: 37.61140,
				},
				options: [],
				isVip: 0,
				typeIds: [],
				selectedType: null,
				selectedCategoriesError: '',
			};
		}

	}

	validation = () => {

		const newInputs = {
			selectedCategoriesError: '',
			adInfoFields: {
				title: {...this.state.adInfoFields.title},
				price: {...this.state.adInfoFields.price},
				description: {...this.state.adInfoFields.description},
				address: {...this.state.adInfoFields.address},
			}};
		let errors = [];

		if (this.state.selectedCategories.length === 0) {
			newInputs.selectedCategoriesError = 'Please select a category';
			errors = [...errors, 'error'];
		}
		if (this.state.adInfoFields.title.value === '') {
		 	newInputs.adInfoFields.title.error = 'Please fill in the field';
			errors = [...errors, 'error'];
		}
		if (this.state.adInfoFields.description.value === '') {
		 	newInputs.adInfoFields.description.error = 'Please fill in the field';
			errors = [...errors, 'error'];
		}
		if (this.state.adInfoFields.price.value === '') {
		 	newInputs.adInfoFields.price.error = 'Please fill in the field';
			errors = [...errors, 'error'];
		}
		if (this.state.adInfoFields.address.value === '') {
		 	newInputs.adInfoFields.address.error = 'Please fill in the field';
			errors = [...errors, 'error'];
		}
		console.log(JSON.stringify(this.state));
		if (errors.length === 0) {
			return (true);
		} else {
	 		this.setState({
				adInfoFields: newInputs.adInfoFields,
				selectedCategoriesError: newInputs.selectedCategoriesError,
			});
			return (false);
	 	}
	}

	next = () => {
		const success = this.validation();
		console.log(success);
		if (success) {
			this.setState({
				step: this.state.step + 1,
			});
		}
	}

	back = () => {
		this.setState({
			step: this.state.step - 1,
		});
	}

	isVip = (e) => {
		const plan = e.target.value;
		if (plan === 'Quick' || plan === 'Turbo') {
			this.setState({
				isVip: 1,
			});
		} else {
			this.setState({
				isVip: 0,
			});
		}

	};

	createtorChangeAdInfoField = (name: AdInfoFieldsNames) =>
		(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
			this.setState({
				adInfoFields: {
					...this.state.adInfoFields,
					[name]: {
						...this.state.adInfoFields[name],
						value: e.target.value,
						error: '',
					},
				},
			});
		}

	createtorChangeSellerInfoField = (name: SellerFieldsNames) =>
		(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
			this.setState({
				adInfoFields: {
					...this.state.adInfoFields,
					[name]: {
						...this.state.adInfoFields[name],
						value: e.target.value,
					},
				},
			});
		}

	creatorChangeOptionById = (id: number) => (e: ChangeEvent<HTMLInputElement>) => {
		const newOptions = this.state.options.map(option => {
			if (option.item.id !== id) {
				return option;
			} else {
				return {
					item: option.item,
					value: e.target.value,
				};
			}
		});

		this.setState({ options: newOptions });
	}

	onSelectCategories = (selectedCategories: ICategory[]) => {
		let selectedType = null;
		const options = this.getOptionsBySelectedCategories(selectedCategories);
		const typeIds = getSelectAdTypeIdsBySelectedCategories(selectedCategories);

		const updatedOptions = options.map((option): IOption => {
			const findedOption = this.state.options.filter(ops => {
				return ops.item.id === option.item.id;
			});

			if (findedOption.length > 0) {
				return findedOption[0];
			}

            return option;
		});

		if (typeIds.length > 0) {
			if (typeIds.indexOf(this.state.selectedType) !== -1) {
				selectedType = this.state.selectedType;
			} else {
				selectedType = typeIds[0];
			}
		}

		this.setState({
			selectedCategories,
			options: updatedOptions,
			selectedType,
			typeIds,
			selectedCategoriesError: '',
		});
	}

	onSelectTypeAd = (id: number) => {
		this.setState({
			selectedType: id,
		});
	}

	getOptionsBySelectedCategories = (selectedCategories: ICategory[]) => {
		const lastCategory = selectedCategories.length > 0 && selectedCategories[selectedCategories.length - 1] || null;
		return (lastCategory && lastCategory.total_options || []).map(option => {
			return { value: '', item: option };
		});

	}

	onUpdateImages = (images: IAttachedImage[]) => {
		this.setState({ attachedImages: images });
	}

	findImageByIndex = index => {
		return this.state.attachedImages[index];
	}

	deleteImageFromAttachments = (image: IAttachedImage) => {
		this.setState({
			attachedImages: this.state.attachedImages.filter(attachedImage => attachedImage !== image),
		});
	}

	deleteImage = (index: number) => {
		const image = this.findImageByIndex(index);
		if (image.isBackend) {
			UserActions.ownedAds.deleteImage.REQUEST({ id: image.id });
			this.deleteImageFromAttachments(image);
		} else {
			this.deleteImageFromAttachments(image);
		}
	}

	onSelectLocation = (location: ILocation) =>  this.setState({ location });

	callCallback = () => this.props.callback(this.state);

	render() {
		const { step } = this.state;
		if (!this.props.categories) {
			return null;
		}

		if (step === 1) {
			return (
				<div>
					<InformationAboutAd
						adInfoFields={ this.state.adInfoFields }
						sellerInfoFields={ this.state.sellerInfoFields }
						createtorChangeAdInfoField={ this.createtorChangeAdInfoField }
						createtorChangeSellerInfoField={ this.createtorChangeSellerInfoField }
						selectedCategories={ this.state.selectedCategories }
						selectedCategoriesError={ this.state.selectedCategoriesError }
						onSelectCategories={ this.onSelectCategories }
						onUpdateImages={ this.onUpdateImages }
						deleteImage={ this.deleteImage }
						categories={ this.props.categories }
						attachedImages={ this.state.attachedImages }
						defaultCategoryId={ this.state.defaultCategoryId }
						onSelectLocation={ this.onSelectLocation }
						location={ this.state.location }
						options={ this.state.options }
						creatorChangeOptionById={ this.creatorChangeOptionById }
						onSelectTypeAd={ this.onSelectTypeAd }
						selectedType={ this.state.selectedType }
						typeIds={ this.state.typeIds }

					/>
					<div className='container page-create'>
						<button
							onClick={ this.next }
							className='btn orange-btn w-25 float-right'
						>
							Continue
						</button>
					</div>
				</div>
			);
		} else {
			return (
				<ConfirmAd
					selectedCategories={ this.state.selectedCategories }
					fullName={ this.state.sellerInfoFields.name.value }
					email={ this.state.sellerInfoFields.email.value }
					phone={ this.state.sellerInfoFields.phone.value }
					address={ this.state.adInfoFields.address.value}
					title={ this.state.adInfoFields.title.value }
					price={ this.state.adInfoFields.price.value }
					description={ this.state.adInfoFields.description.value }
					locationName={ this.state.location.name }
					vip={ this.isVip }
					back={ this.back }
					next={ this.callCallback }
				/>
			);
		}
	}
}

export default connect(mapStateToProps)(getCategories(ManagerAd));