import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';

export interface IImage {
    urls: object,
}

class SliderImages extends Component<IImage, {}> {
    constructor(props, context) {
        super(props, context)

    }

    render() {
        return (
            <div className="col-lg-7">
                <div className="ads-image">
                    {/*<img src="/static/img/ads/ads3.png" alt="" className="w-100 p-b-10"/>*/}
                    {/*{this.props.urls.map((url) =>*/}
                        {/*<img key={url.id} src={url.src} alt="" className="w-25"/>*/}
                    {/*)}*/}
                    <ImageGallery/>
                </div>
            </div>
        )
    }

}

export default SliderImages;