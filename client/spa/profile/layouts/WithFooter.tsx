import React from 'react';
import { withRouter } from 'react-router';

import Footer from 'client/ssr/blocks/footer/Footer';

const WithFooter: React.SFC<any> = ({ children }) => (
	<>
		{children}
		<Footer />
	</>
);

export default withRouter(WithFooter);