import React from 'react';
import dynamic from 'next/dynamic';

import 

require('client/spa/pages/Helpers.sass');
require('client/spa/pages/ToolBar.sass');
require('client/spa/pages/MyAds.sass');
require('client/spa/pages/create-ad/CreateAd.sass');
require('client/spa/pages/ProfileSettings/ProfileSettings.sass');
require('client/ssr/blocks/footer/Footer.sass');
require('client/spa/pages/favorites/FavoritesPage.sass');

const Content = dynamic(import('client/spa/profile/Root') as any, {
	ssr: false,
	loading: () => <h1>Loading SPA</h1>,
});

class Profile extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<>
				<Content />
			</>
		);
	}
}

export default Profile;