import React from 'react';
import { Link, BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from 'client/ssr/blocks/header/Header';
import Toolbar from 'client/spa/profile/blocks/toolbar/Toolbar';
import PrivareWrap from './PrivareWrap';

// Layouts
import WithMenu from './layouts/WithMenu';

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
	profileSettingsPagePath,
} from './constants';
import { Redirect } from 'react-router';

class Router extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<>
				<BrowserRouter>
					<PrivareWrap>
						<Header />
						<Toolbar />
						<Switch>
							<Route path='/profile/create-ad' component={ CreateAd } />
							<Route path='/profile/edit-ad/:id' component={ EditAd } />
							<WithMenu>
								<Route path={ profileSettingsPagePath } component={ ProfileSettings } />
								<Route path={ notificationPagePath } component={ Notifications } />
								<Route path={ myAdsPagePath } component={ MyAds }/>
								<Redirect to={ defaultPagePath } />
							</WithMenu>
						</Switch>
					</PrivareWrap>
				</BrowserRouter>
			</>
		);
	}
}

export default Router;