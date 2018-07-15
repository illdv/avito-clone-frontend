import React from 'react';

import Ad, { IAd } from './components/Ad';
export { IAd };

require('./Ads.sass');

export interface AdsProps {
    title: string,
    ad: IAd[]
}

class Ads extends React.PureComponent<AdsProps> {
    render() {
        return (
            <section className="section-lg">
                <div className="container">
                    <div className="row p-b-20">
                        <div className="col-md-12 ">
                            <h3>{ this.props.title }</h3>
                        </div>
                    </div>
                    <div className="row">
                        {
                            this.props.ad.map((ad: IAd) => (
                                <div key={ ad.id } className="col-md-4 col-lg-3">
                                    <Ad data={ ad } />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default Ads;