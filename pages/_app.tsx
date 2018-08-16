import React from 'react';
import { types } from 'redux-act';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import configureStore from '../client/common/store';
import { initialize } from '../client/common/location/module';

import { isServer } from '../client/common/utils/utils';
import { CustomStorage } from 'client/common/entities/user/CustomStorage';
import { UserActions } from 'client/common/entities/user/rootActions';
import { useOrDefault } from 'client/spa/profile/utils/createAd';
import SetSearch from 'client/ssr/contexts/QueryContext';

if (isServer) {
	types.disableChecking();
}

class ExampleApp extends App {
	static async getInitialProps({ Component, ctx }) {
		types.clear();
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	props: any;

	componentWillMount() {
		const location = this.props.router.query.location;

		if (!isServer()) {
			const { user } = this.props;
			const token    = CustomStorage.getToken();

			const hasUser = useOrDefault(() => user.profile, false);

			if (!hasUser && token) {
				UserActions.common.initUser.REQUEST({});
			}
		}

		if (location) {
			this.props.store.dispatch(initialize(location));
		}
	}

	render() {
		const { Component, pageProps, store } = this.props;
		return (
			<Container >
				<Provider store={ store } >
					<SetSearch query={pageProps.query} >
						<Component { ...pageProps } />
					</SetSearch>
				</Provider >
			</Container >
		);
	}
}

export default withRedux(() => configureStore)(withReduxSaga(ExampleApp));