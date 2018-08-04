import Spinner from './Spinner';

require('./OverlaySpinner.sass');

export default () => (
	<div className='spinner-overlay' >
		<Spinner />
	</div>
);