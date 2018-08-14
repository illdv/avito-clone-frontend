import React from 'react';
import { Redirect, Router as RouterConnect } from 'react-router';
import { Link, Route, Switch } from 'react-router-dom';

import Header from 'client/ssr/blocks/header/Header';
import Toolbar from 'client/spa/profile/blocks/toolbar/Toolbar';
import PrivareWrap from './PrivareWrap';
import history from '../../common/history';

// Layouts
import WithMenu from './layouts/WithMenu';
import WithFooter from './layouts/WithFooter';

// Pages
import MyAds from './pages/my-ads/MyAds';
import EditAd from 'client/spa/profile/pages/EditAd';
import CreateAd from 'client/spa/profile/pages/CreateAd';
import Notifications from 'client/spa/profile/pages/notifications/Notifications';
import ProfileSettings from 'client/spa/profile/pages/profile-settings/ProfileSettings';
/* import Index from 'client/spa/profile/pages/Index';
import Notification from 'client/spa/profile/pages/notification/Notification'; */
/* import CreateAd from 'client/spa/profile/pages/CreateAd';
import EditAd from 'client/spa/profile/pages/EditAd'; */

import {
	myAdsPagePath,
	defaultPagePath,
	notificationPagePath,
	profileSettingsPagePath, myActiveAdsPagePath, createAdPagePagePath, editAdPagePath,
} from './constants';
import Page404 from 'client/common/layouts/Page404';

const myAdsPagesPaths = [ profileSettingsPagePath, notificationPagePath, myAdsPagePath ];

export default class Router extends React.Component {
	render() {
		return (
			<>
				<RouterConnect history={history}>
					<PrivareWrap>
						<Header />
						<Toolbar />
						<WithFooter>
							<Switch>
								<Route path={ createAdPagePagePath } component={ CreateAd } />
								<Route path={ editAdPagePath } component={ EditAd } />

								<WithMenu path={ myAdsPagesPaths } >
									<Route path={ profileSettingsPagePath } component={ ProfileSettings } />
									<Route path={ notificationPagePath } component={ Notifications } />
									<Route path={ myAdsPagePath } component={ MyAds } />
								</WithMenu>

								<Redirect exact from='/profile' to={ myActiveAdsPagePath } />
								<Route from='/profile/**' component={ Page404 } />
							</Switch>
						</WithFooter>
					</PrivareWrap>
				</RouterConnect>
			</>
		);
	}
}
