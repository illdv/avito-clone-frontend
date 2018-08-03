import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { UserActions } from 'client/common/entities/user/rootActions';

import {
	myActiveAdsPagePath,
	notificationPagePath,
	profileSettingsPagePath,
} from '../../constants';

const StylizedLinkStyle = {
	display: 'inline-block',
	width: '100%',
	height: '100%',
};

const StylizedLink: React.SFC<{ to: string }> = ({ to, children }) => (
	<li className='account-navigation__item'>
		<NavLink
			to={ to }
			activeClassName='account-navigation__item--active'
			style={ StylizedLinkStyle }
		>
			{ children }
		</NavLink>
	</li>
);

const Navigation: React.SFC<{countNotReadNotification: number, match: any}> = ({ countNotReadNotification }) => (
	<div className='account-navigation'>
		<ul className='list-unstyled m-b-0'>
			<StylizedLink to={ myActiveAdsPagePath }>
				My announcements
			</StylizedLink>

			{/* <StylizedLink to={'/profile/mock'}>
				Posts
			</StylizedLink> */}

			<StylizedLink to={ notificationPagePath }>
				Notifications
				{
					countNotReadNotification
					?
						<span className='notification account__notification'>{countNotReadNotification}</span>
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

export default Navigation;