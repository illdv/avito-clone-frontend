import React from 'react';

import Menu from 'client/spa/profile/blocks/menu/Menu';

const WithMenu: React.SFC = ({ children }) => (
	<section className='page'>
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

export default WithMenu;