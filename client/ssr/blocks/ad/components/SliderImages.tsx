import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import { ISlide, ISliderProps } from 'client/ssr/blocks/ad/interface';

class SliderImages extends Component<ISliderProps> {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className='col-lg-7'>
				<div className='ads-image '>
				 <IssetImages images={this.props.images}/>
				</div>
			</div>
		);
	}
}

const IssetImages = (images: ISliderProps) => {
	return images.images.length === 0 ? <NoImages/> :
		<ImageGallery
			items={images.images}
			showPlayButton={false}
		/>
};

const NoImages = () => {
	return (

		<h3>We are very sorry, but this ad does not have any photos</h3>
	);
};

export default SliderImages;