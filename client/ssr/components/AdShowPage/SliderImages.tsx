import React from 'react';
import ImageGallery from 'react-image-gallery';
import { ISliderProps } from 'client/ssr/blocks/ad/interface';

const SliderImages = (props: ISliderProps) => (
	<div className='col-lg-7 min-height'>
		<div className='ads-image'>
		{
			props.images.length !== 0 &&
			<ImageGallery
				items={props.images}
				showPlayButton={false}
			/>
		}
		</div>
	</div>
);

export default SliderImages;