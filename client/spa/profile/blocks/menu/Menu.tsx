import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { IRootState } from 'client/common/store/storeInterface';
import { UserActions } from 'client/common/entities/user/rootActions';
import { filterNotification } from 'client/spa/profile/pages/notifications/utils';

import { FilterType } from '../../pages/notifications/interface';

import Navigation from './Navigation';

export interface IProps {
	user: IUserState;
	match: any;
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

class ProfileMenu extends Component<IProps> {

	onLogout = () => {
		UserActions.common.logout.REQUEST({});
	}

	get userImage() {
		return this.props.user.profile &&
				this.props.user.profile.image &&
				this.props.user.profile.image.file_url || '/static/img/person.png';
	}

	get profileName() {
		return this.props.user.profile &&
				this.props.user.profile.name;
	}

	get profileEmail() {
		return this.props.user.profile &&
				this.props.user.profile.email;
	}

	render() {

		const { items, noReadCount } = this.props.user.notifications;

		const countNotReadNotification = items.length > 0 ?
		filterNotification(FilterType.NoRead, items).length : noReadCount;

		return (
			<div className='account'>
				<div className='account__person'>
					<img
						alt=''
						src={ this.userImage }
						className='account__img'
					/>
					<div>
						<h6 className='account__name'>
							{ this.profileName }
						</h6>
						<span className='account__location'>
							{ this.profileEmail }
						</span>
					</div>
				</div>
				<Navigation match={this.props.match} countNotReadNotification={countNotReadNotification} />
			</div>
		);
	}
}

export default withRouter(connect( mapStateToProps )(ProfileMenu));