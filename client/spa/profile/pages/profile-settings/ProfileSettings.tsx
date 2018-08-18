import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import Avatar from 'react-avatar-edit';

import { IRootState } from 'client/common/store/storeInterface';
import { UserActions } from 'client/common/entities/user/rootActions';

import ConfirmationAccountDeletionModal from 'client/spa/modals/confirmation-account-deletion/ConfirmationAccountDeletionModal';

import {
	showConfirmationAccountDeletionModal,
} from 'client/spa/modals/confirmation-account-deletion/confirmationAccountDeletionModalTriggers';
import Spinner from '../../../../common/blocks/spinner/Spinner';
import { UserAPI } from 'client/common/api/UserAPI';

enum FieldsNames {
	fullName = 'fullName',
	email = 'email',
	phone = 'phone',
}

interface IFields {
	[FieldsNames.fullName]: string;
	[FieldsNames.email]: string;
	[FieldsNames.phone]: string;
}

interface IState {
	passwordFields: IChangePasswordRequest;
	fields: IFields;
	preview: string;
	editAvatar: boolean;
	file: any;
}

interface IProps {
	user: IUserState;
}

export class ProfileSettings extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);

		this.state = {
			passwordFields: {
				old_password: '',
				password: '',
				password_confirmation: '',
			},
			fields: {
				fullName: this.props.user.profile.name,
				email: this.props.user.profile.email,
				phone: this.props.user.profile.phone,
			},
			preview: null,
			editAvatar: false,
			file: null,
		};
	}

	get defaultImage() {
		return this.props.user.profile &&
				this.props.user.profile.image &&
				this.props.user.profile.image.file_url || '/static/img/person.png';
	}

	onChange = event => {
		const {id, value} = event.target;
		this.setState({
			passwordFields: {...this.state.passwordFields, [id]: value},
		});
	}

	clearPasswordFields = () => () => {
		this.setState({
			passwordFields: {
				old_password: '',
				password: '',
				password_confirmation: '',
			},
		});
	}

	onPasswordChange = () => {
		const {old_password, password, password_confirmation} = this.state.passwordFields;
		UserAPI.changePassword(this.state.passwordFields).then(
			this.clearPasswordFields(),
		);
		UserActions.profile.changePassword.REQUEST({old_password, password, password_confirmation});

	}
	
	onFileLoad = file => this.setState({ file });
	
	onCrop = preview => this.setState({ preview });

	onShowAvatarEditor = () => this.setState({ editAvatar: true });

	onHideAvatarEditor = () => this.setState({ editAvatar: false, preview: null });

	onSaveCrop = () => this.setState({ editAvatar: false });

	creatorChangeFieldValue = (fieldName: FieldsNames) => (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			fields: {
				...this.state.fields,
				[fieldName]: e.target.value,
			},
		});
	}

	onChangeProfile = () => {
		const data: IChangeProfileRequest = {
			name: this.state.fields.fullName,
			email: this.state.fields.email,
			phone: this.state.fields.phone,
		};

		if (this.state.file) {
			fetch(this.state.preview)
				.then(res => res.blob())
				.then(blob => {
					data.image = new File([blob], 'avatar');
					UserActions.profile.changeProfile.REQUEST(data);
				});

		} else {
			UserActions.profile.changeProfile.REQUEST(data);
		}

	}

	get avatar() {
		return (
			<div
				className='avatar__container'
				onClick={this.onShowAvatarEditor}
			>
				<img
					alt=''
					src={this.state.preview || this.defaultImage}
					className='account__img account__img_big'
				/>
			</div>
		);
	}

	get avatarEditor() {
		return (
			<div>
				<Avatar
					width={ 230 }
					height={ 120 }
					onCrop={ this.onCrop }
					src={ this.state.preview }
					onFileLoad={ this.onFileLoad }
					onClose={ this.onHideAvatarEditor }
				/>
				{
					this.state.preview && 
					<button
						onClick={ this.onSaveCrop }
						className='btn orange-btn-outline publish-offer__button'
					>
						Crop
					</button>
				}
			</div>
		);
	}

	deleteAccount = () => UserActions.profile.deleteAccount.REQUEST({});

	render() {
		return (
			<>
				<ConfirmationAccountDeletionModal deleteAccountCallback={ this.deleteAccount } />
				<div className='profile-info'>
					<h5>Contact Information</h5>
					<p>The photo</p>
					<div className='account__person'>
						{
							this.state.editAvatar
							?
								this.avatarEditor
							:
								this.avatar
						}
					</div>
					<form>
						<div className='form-group row'>
							<label
								htmlFor='full-name'
								className='col-sm-2 col-form-label profile-info__label'
							>
								Full name
							</label>
							<div className='col-sm-4'>
								<input
									type='text'
									className='form-control'
									id='full-name'
									placeholder='Full name'
									value={ this.state.fields.fullName }
									onChange={ this.creatorChangeFieldValue(FieldsNames.fullName) }
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label
								htmlFor='email'
								className='col-sm-2 col-form-label profile-info__label'
							>
								Email
							</label>
							<div className='col-sm-4'>
								<input
									type='email'
									className='form-control'
									id='email'
									placeholder='Email'
									value={ this.state.fields.email }
									onChange={ this.creatorChangeFieldValue(FieldsNames.email) }
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label
								htmlFor='phone'
								className='col-sm-2 col-form-label profile-info__label'
							>
								Phone
							</label>
							<div className='col-sm-4'>
								<input
									type='text'
									className='form-control'
									id='phone'
									placeholder='+987 654 321 000'
									value={ this.state.fields.phone }
									onChange={ this.creatorChangeFieldValue(FieldsNames.phone) }
								/>
							</div>
						</div>
						<div className='text-center'>
							<a className='btn button orange-btn-outline profile-info__button'  onClick={this.onChangeProfile}>Save</a>
						</div>
					</form>
				</div>
				<div className='profile-info'>
					<h5>Change Password</h5>
					<p>Enter your current password, new password, and re-enter the new password to exclude the
						possibility of a typo.</p>
					<form>
						<div className='form-group row'>
							<label
								htmlFor='current-password'
								className='col-sm-3 col-form-label profile-info__label'
							>
								Current password
							</label>
							<div className='col-sm-4'>
								<input
									type='password'
									name='old_password'
									className='form-control'
									id='old_password'
									value={ this.state.passwordFields.old_password }
									onChange={this.onChange}
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label
								htmlFor='new-password'
								className='col-sm-3 col-form-label profile-info__label'
							>
								New password
							</label>
							<div className='col-sm-4'>
								<input
									type='password'
									name='password'
									className='form-control'
									id='password'
									value={ this.state.passwordFields.password }
									onChange={this.onChange}
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label
								htmlFor='confirm-password'
								className='col-sm-3 col-form-label profile-info__label'
							>
								Confirm password
							</label>
							<div className='col-sm-4'>
								<input
									type='password'
									className='form-control'
									id='password_confirmation'
									name='password_confirmation'
									value={ this.state.passwordFields.password_confirmation }
									onChange={this.onChange}
								/>
							</div>
						</div>
						<div className='text-center'>
							<a
								className='btn button orange-btn-outline profile-info__button'
								onClick={this.onPasswordChange}
							>
								Save
							</a>
						</div>
					</form>
				</div>
				<div className='profile-info'>
					<h5>Customize notifications</h5>
					<p>
						Ads have the right to send system notifications to the user without the possibility of unsubscribing from them.
					</p>
					<div className='notification-control'>
						<div>
							<h6 className='notification-control__title'>Personal Collections</h6>
							<p className='notification-control__description'>Collections of interesting ads and categories</p>
						</div>
						<div className='switch-button'>
							<input
								className='switch-button__input'
								type='checkbox'
								id='personal-collections'
							/>
							<label
								className='switch-button__label'
								htmlFor='personal-collections'
							/>
						</div>
					</div>
					<div className='notification-control'>
						<div>
							<h6 className='notification-control__title'>Posts</h6>
							<p className='notification-control__description'>Notifications for new messages in the messenger</p>
						</div>
						<div className='switch-button'>
							<input
								className='switch-button__input'
								type='checkbox'
								id='posts'
							/>
							<label
								className='switch-button__label'
								htmlFor='posts'
							/>
						</div>
					</div>
					<div className='notification-control'>
						<div>
							<h6 className='notification-control__title'>Promotions</h6>
							<p className='notification-control__description'>Individual discounts and special offers</p>
						</div>
						<div className='switch-button'>
							<input
								className='switch-button__input'
								type='checkbox'
								id='promotions'
							/>
							<label
								className='switch-button__label'
								htmlFor='promotions'
							/>
						</div>
					</div>
					<div className='notification-control'>
						<div>
							<h6 className='notification-control__title'>Participation in research</h6>
							<p className='notification-control__description'>Based on your answers, we will make Ads better</p>
						</div>
						<div className='switch-button'>
							<input
								className='switch-button__input'
								type='checkbox'
								id='participation-in-research'
							/>
							<label
								className='switch-button__label'
								htmlFor='participation-in-research'
							/>
						</div>
					</div>
					<div className='notification-control'>
						<div>
							<h6 className='notification-control__title'>News</h6>
							<p className='notification-control__description'>Information about the company and new functions Ads</p>
						</div>
						<div className='switch-button'>
							<input
								className='switch-button__input'
								type='checkbox'
								id='news'
							/>
							<label
								className='switch-button__label'
								htmlFor='news'
							/>
						</div>
					</div>
					<div className='notification-control'>
						<div>
							<h6 className='notification-control__title'>Tips from Ads</h6>
							<p className='notification-control__description'>Recommendations for effective work with the site</p>
						</div>
						<div className='switch-button'>
							<input
								className='switch-button__input'
								type='checkbox'
								id='tips-from-ads'
							/>
							<label
								className='switch-button__label'
								htmlFor='tips-from-ads'
							/>
						</div>
					</div>
				</div>
				<div className='profile-info'>
					<h5>Account deleting</h5>
					<p>If you want to permanently delete your account and all your ads, click on the 'Delete account'
						button.</p>
					<div className='text-center'>
						<a
							className='btn button orange-btn-outline profile-info__button'
							onClick={showConfirmationAccountDeletionModal}
						>
							Delete account
						</a>
					</div>
				</div>
			</>
		);
	}
}

const mpStateToProprs = (state: IRootState) => ({
	user: state.user,
});

// TODO SUKA UDALI!
export default connect(mpStateToProprs)(({ user }: IProps) => {
	if (user.profile) {
		return <ProfileSettings user={ user } />;
	} else {
		return <Spinner />;
	}
});