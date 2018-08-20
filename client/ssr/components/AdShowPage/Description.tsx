import React from 'react';
import { IDescription } from 'client/ssr/blocks/ad/interface';

const Description = ({ body }: IDescription) => (
	<div className='row'>
		<div className='col-md-12 col-lg-10 '>
			<h3 className='p-t-30'>
				Description
			</h3>
			<span>
				{body}
				</span>
		</div>
	</div>
);

export default Description;