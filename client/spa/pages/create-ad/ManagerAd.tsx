import React, { ChangeEvent } from 'react';
import { connect, Dispatch } from 'react-redux';

import InformationAboutAd from './InformationAboutAd';
import { ICategory } from 'client/common/categories/interface';
import { bindModuleAction } from 'client/common/user/utils';
import { AdsActions, IAdsActions } from 'client/common/ads/actions';
import { IRootState } from 'client/common/store/storeInterface';
import ConfirmAd from './ConfirmAd';
import { transformationAdToManagerState } from './utils';

import {
	ISellerInfoFields,
	IAdInfoFields,
	IAttachedImage,
	ILocation,
	AdInfoFieldsNames,
	SellerFieldsNames,
} from './interface';
import { IAds } from 'client/common/ads/interface';

interface IProps {
	initialAd?: IAds;
	adsActions: IAdsActions;
	user: IUser;
	callback(state: IState): void;
}

export interface IState {
	step: number;
	sellerInfoFields: ISellerInfoFields;
	adInfoFields: IAdInfoFields;
	selectedCategories: ICategory[];
	attachedImages: IAttachedImage[];
	defaultCategoryId: string;
	location: ILocation;
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	adsActions: bindModuleAction(AdsActions, dispatch),
});

class ManagerAd extends React.Component<IProps, IState> {
	constructor(props, context) {
		super(props, context);

		if (this.props.initialAd) {
			// Edit Ad
			this.state = transformationAdToManagerState(this.props.initialAd, {
				name: { disable: true, value: this.props.user.name },
				email: { disable: true, value: this.props.user.email },
				phone: { disable: false, value: this.props.user.name },
			});
		} else {
			// Create Ad
			this.state = {
				step: 1,
				sellerInfoFields: {
					name: { disable: true, value: this.props.user.name },
					email: { disable: true, value: this.props.user.email },
					phone: { disable: false, value: this.props.user.phone },
				},
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

	onSelectCategories = (selectedCategories: ICategory[]) => {
		this.setState({ selectedCategories });
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
			this.props.adsActions.deleteImage.REQUEST({ id: image.id });
			this.deleteImageFromAttachments(image);
		} else {
			this.deleteImageFromAttachments(image);
		}
	}

	onSelectLocation = (location: ILocation) =>  this.setState({ location });

	callCallback = () => this.props.callback(this.state);

	render() {
		const { step } = this.state;

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
						attachedImages={ this.state.attachedImages }
						defaultCategoryId={ this.state.defaultCategoryId }
						onSelectLocation={ this.onSelectLocation }
						location={ this.state.location }
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
					back={ this.back }
					next={ this.callCallback }
				/>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerAd);