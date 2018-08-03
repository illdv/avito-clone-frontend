import React from 'react';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';

import OverlaySpinner from 'client/common/blocks/spinner/OverlaySpinner';

// spa styles
require('client/spa/profile/Helpers.sass');
require('client/spa/profile/blocks/toolbar/Toolbar.sass');
require('client/spa/profile/pages/my-ads/MyAds.sass');
require('client/spa/profile/blocks/manager-ad/ManagerAd.sass');
require('client/spa/profile/pages/profile-settings/ProfileSettings.sass');

// ssr styles
require('client/ssr/blocks/footer/Footer.sass');

const Content = dynamic(import('client/spa/profile/Router') as any, {
	ssr: false,
	loading: () => <OverlaySpinner />,
});

class Profile extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<>
				<Content />
				<ToastContainer />
			</>
		);
	}
}

export default Profile;