import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import Menu from 'client/spa/profile/blocks/menu/Menu';
interface IWithMenu {
	path: any;
}
const WithMenu: React.SFC<IWithMenu & RouteComponentProps<any>> = ({ children }) => (
	<section className='page page__my-ads'>
		<div className='container page__container-lg'>
			<div className='row'>
				<div className='col-lg-3'>
					<Menu />
				</div>
				<div className='col-lg-9'>
					{ children }
				</div>
			</div>
		</div>
	</section>
);

export default withRouter(WithMenu);