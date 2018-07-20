import React, { Component } from 'react';
import { IDescription } from 'client/ssr/blocks/ad/interface';

class Description extends Component<IDescription> {
	render() {
		return (
			<div className='row'>
				<div className='col-md-12 col-lg-10 '>
					<h3 className='caption p-b-30'>
						{/*Vehicle Description*/}
						Description
					</h3>
					<span>
						{this.props.body}
				</span>
				</div>
			</div>

		);
	}
}

export default Description;