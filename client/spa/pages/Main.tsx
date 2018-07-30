import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router as RouterConnect } from 'react-router';
import { Route, Switch as SwitchRoute } from 'react-router-dom';

const history = createHistory();

class Name extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<RouterConnect history={history}>
				<SwitchRoute>
					
				</SwitchRoute>
			</RouterConnect>
		)
	}
}

export default Name;