import React, { Component } from 'react';
import SimilarAds from 'client/ssr/blocks/ad/components/SimilarAds';
import { IChart } from 'client/ssr/blocks/ad/interface';
import { Line } from 'react-chartjs-2';

const data = {
	labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	datasets: [{
		label: '# of Votes',
		data: [12, 19, 3, 5, 2, 3],
		backgroundColor: [
			'rgba(255, 99, 132, 0.2)',

		],
		borderColor: [
			'rgba(255,99,132,1)',
			'rgba(54, 162, 235, 1)',
			'rgba(255, 206, 86, 1)',
			'rgba(75, 192, 192, 1)',
			'rgba(153, 102, 255, 1)',
			'rgba(255, 159, 64, 1)',
		],
		borderWidth: 1,
	}],
};

class Chart extends Component<IChart> {
	render() {
		return (
			<div className='row p-t-60'>
				<div className='col-lg-8'>
					<div className='offer-location'>
						<Line data={data} />
					</div>
				</div>
				<SimilarAds
					similar_ad={this.props.similar_ads}
					id_parent={this.props.id_parent}
				/>
			</div>
		);
	}
}

export default Chart;