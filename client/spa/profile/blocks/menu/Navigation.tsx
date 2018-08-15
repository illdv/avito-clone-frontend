import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { UserActions } from 'client/common/entities/user/rootActions';

import {
	myActiveAdsPagePath,
	notificationPagePath,
	profileSettingsPagePath,
	myCompletedAdsPagePath,
	myDisapprovedAdsPagePath,
} from '../../constants';
import { withRouter, RouteComponentProps } from 'react-router';

const StylizedLinkStyle = {
	display: 'inline-block',
	width: '100%',
	height: '100%',
};

interface StylizedLinkProps {
	to: string;
	relations?: string[];
	pathname?: string;
}

const checkIsActiveByRelate = (relations: string[], pathname: string) => () => {
	if (!(relations instanceof Array)) {
		return false;
	}

	return relations.some(relate => {
		if (!relate || !pathname) {
			return false;
		}

		return relate === pathname;
	});
}

const StylizedLink: React.SFC<StylizedLinkProps> = ({ to, relations, pathname, children }) => (
	<li className='account-navigation__item'>
		<NavLink
			to={ to }
			activeClassName='account-navigation__item--active'
			isActive={ relations && checkIsActiveByRelate(relations, pathname) }
			style={ StylizedLinkStyle }
		>
			{ children }
		</NavLink>
	</li>
);

interface IProps extends RouteComponentProps<{}> {
	countNotReadNotification: number;
}

class Navigation extends React.Component<IProps> {
	render() {

		return (
			<div className='account-navigation'>
				<ul className='list-unstyled m-b-0'>
					<StylizedLink
						to={ myActiveAdsPagePath }
						pathname={this.props.location.pathname}
						relations={ [myActiveAdsPagePath, myCompletedAdsPagePath, myDisapprovedAdsPagePath] }
					>
						My announcements
					</StylizedLink>

					{/* <StylizedLink to={'/profile/mock'}>
						Posts
					</StylizedLink> */}

					<StylizedLink to={ notificationPagePath }>
						Notifications
						{
							this.props.countNotReadNotification
							?
								<span className='notification account__notification'>{this.props.countNotReadNotification}</span>
							:
								null
						}
					</StylizedLink>

					<StylizedLink to={ profileSettingsPagePath }>
						Settings
					</StylizedLink>

					{/* <StylizedLink to={'/profile/mock'}>
						History
					</StylizedLink> */}
					<li
						className='account-navigation__item'
						onClick={ UserActions.common.logout.REQUEST }
					>
						Logout
					</li>
				</ul>
			</div>
		);
	}
}

export default withRouter(Navigation);