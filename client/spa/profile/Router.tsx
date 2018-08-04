import React from 'react';
import { Router as RouterConnect } from 'react-router';
import { Link, Route, Switch} from 'react-router-dom';

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
	profileSettingsPagePath,
} from './constants';

const PageNoCreate = () => (
	<h1>Page not yet created</h1>
);

class Router extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<>
				<RouterConnect history={ history }>
					<PrivareWrap>
						<Header />
						<Toolbar />
						<Switch>
							<WithFooter path='/profile/ad'>
								<Route path='/profile/ad/create' component={ CreateAd } />
								<Route path='/profile/ad/edit/:id' component={ EditAd } />
							</WithFooter>
							<WithFooter>
								<WithMenu>
									<Route path={ '/profile/mock' } component={ PageNoCreate } />
									<Route path={ profileSettingsPagePath } component={ ProfileSettings } />
									<Route path={ notificationPagePath } component={ Notifications } />
									<Route path={ myAdsPagePath } component={ MyAds }/>
								</WithMenu>
							</WithFooter>
						</Switch>
					</PrivareWrap>
				</RouterConnect>
			</>
		);
	}
}

export default Router;