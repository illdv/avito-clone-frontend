import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import { ISliderProps } from 'client/ssr/blocks/ad/interface';

class SliderImages extends Component<ISliderProps> {
	render() {
		return (
			<div className='col-lg-7'>
				<div className='ads-image'>
					<ImageGallery
						items={this.props.images}
						showPlayButton={false}
					/>
				</div>
			</div>
		);
	}
}

export default SliderImages;