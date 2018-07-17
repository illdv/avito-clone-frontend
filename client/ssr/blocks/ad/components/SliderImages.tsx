import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';

export interface IImage {
    images: object,
}

class SliderImages extends Component<IImage, {}> {
    constructor(props, context) {
        super(props, context)

    }

    render() {
        return (
            <div className="col-lg-7">
                <div className="ads-image">
                    <ImageGallery items={this.props.images}/>
                </div>
            </div>
        )
    }

}

export default SliderImages;