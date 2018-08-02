import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router as RouterConnect } from 'react-router';
import { Route, Switch as SwitchRoute } from 'react-router-dom';

import Header from 'client/ssr/blocks/header/Header';
import Toolbar from 'client/spa/profile/blocks/toolbar/Toolbar';
import PrivareWrap from './PrivareWrap';

import Index from 'client/spa/profile/pages/Index';
/* import CreateAd from 'client/spa/profile/pages/CreateAd';
import EditAd from 'client/spa/profile/pages/EditAd'; */

const history = createHistory();

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
						<SwitchRoute>
							{/* <Route path='/profile/create-ad' component={ CreateAd } />
							<Route path='/profile/edit-ad/:id' component={ EditAd } /> */}
							<Route path='/profile*' component={ Index }/>
						</SwitchRoute>
					</PrivareWrap>
				</RouterConnect>
			</>
		);
	}
}

export default Router;