import * as React from 'react';
require('./Page404');
import history from 'client/common/history';

const Page404 = () => {
	const onHome = () => {
		window.location.href = '/';
	};
	const Back   = () => history.goBack();
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12 col-md-8 offset-md-2 error__page'>
					<p className='m-b-0'>Oops! something went wrong.</p>
					<div className='error__number'>404</div>
					<h2>Page Not Found</h2>
					<p>The link you followed is either outdated, inaccurate, or the server has been instructed not to
						let you have it</p>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-2 offset-md-4'>
					<button
						className='btn orange-btn w-100'
						onClick={onHome}
					>Home
					</button>
				</div>
				<div className='col-md-2'>
					<button
						className='btn orange-btn-outline w-100'
						onClick={Back}
					>Back
					</button>
				</div>
			</div>
		</div>
	);
};

export default Page404;
