import React, { ChangeEvent } from 'react';
import { connect, Dispatch } from 'react-redux';

import InformationAboutAd from './InformationAboutAd';
import { IRootState } from 'client/common/store/storeInterface';
import ConfirmAd from './ConfirmAd';
import { transformationAdToManagerState } from '../../utils/createAd';

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
	is_vip: number;
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
			this.state = {
				step: 1,
				sellerInfoFields,
				adInfoFields: {
					title: { disable: false, value: '' },
					price: { disable: false, value: '' },
					description: { disable: false, value: '' },
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
				is_vip: 0,
			};
		}

	}

	next = () => {
		this.setState({
			step: this.state.step + 1,
		});
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
				is_vip: 1,
			});
		} else {
			this.setState({
				is_vip: 0,
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
		const options = this.getOptionsBySelectedCategories(selectedCategories);

		const updatedOptions = options.map((option): IOption => {
			const findedOption = this.state.options.filter(ops => {
				return ops.item.id === option.item.id;
			});

			if (findedOption.length > 0) {
				return findedOption[0];
			} else {
				return option;
			}
		});

		this.setState({
			selectedCategories,
			options: updatedOptions,
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
					/>
					<div className='container'>
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