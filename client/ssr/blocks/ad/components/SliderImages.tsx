import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import { ISlide, ISliderProps } from 'client/ssr/blocks/ad/interface';

class SliderImages extends Component<ISliderProps> {
	render() {
		return (
			<div className='col-lg-7 min-height'>
				<div className='ads-image'>
					{
						this.props.images.length !== 0 &&
						<ImageGallery
							items={this.props.images}
							showPlayButton={false}
						/>
					}
				</div>
			</div>
		);
	}
}
export default SliderImages;