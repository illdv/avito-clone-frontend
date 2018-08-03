import React, { Component } from 'react';
import SimilarAds from 'client/ssr/blocks/ad/components/SimilarAds';
import { IChart, IChartState } from 'client/ssr/blocks/ad/interface';
import { Line } from 'react-chartjs-2';

class Chart extends Component<IChart, IChartState> {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				labels: this.formationLables(),
				datasets: [{
					data: this.formationData(),
					label: 'Price',
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
			},
			options: {
				legend: {
					display: false,
				},
				title: {
					display: true,
					text: 'Price change',
					fontFamily: "'Roboto'",
					fontSize: 16,
					fontColor: '#000000',
					fontStyle: '500',
				},
			},
		};
	}

	formationLables() {
	 return	this.props.price_histories.map(history => {
			return history.date_time;
		});
	}

	formationData() {
		return this.props.price_histories.map(history => {
			return history.value;
		});
	}
	render() {
		return (
			<div className='row p-t-60'>
				<div className='col-lg-8'>
					<div className='offer-location'>
						<Line data={this.state.data} options={this.state.options} />
					</div>
				</div>
				<SimilarAds
					similar_ads={this.props.similar_ads}
					id_parent={this.props.id_parent}
				/>
			</div>
		);
	}
}

export default Chart;