import React, { Component } from 'react';
import SimilarAds from 'client/ssr/components/AdShowPage/SimilarAds';
import { IChart, IChartState } from 'client/ssr/blocks/ad/interface';
import { optionChart } from 'client/ssr/components/AdShowPage/Chart/configChart';
import { Line } from 'react-chartjs-2';

class Chart extends Component<IChart, IChartState> {
	state = {
		data: {
			labels: this.formationLabels(),
			datasets: [{
				data: this.formationData(),
				label: 'Price',
				backgroundColor: [
					'rgba(255, 185, 27, 1)',
				],
				borderColor: [
					'rgba(0, 0, 0, 1)',
				],
				pointBorderColor: [
					'rgba(0, 0, 0, 1)',
				],
				borderWidth: 1,
				pointBackgroundColor: 'rgba(0, 0, 0, 1)',
			}],
		}
	};

	formationLabels() {
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
		const { data } = this.state;
		const { similar_ads, id_parent } = this.props;
		return (
			<div className='row p-t-60'>
				<div className='col-lg-8'>
					<div className='offer-location'>
						<Line data={data} options={optionChart}/>
					</div>
				</div>
				<SimilarAds
					similar_ads={similar_ads}
					id_parent={id_parent}
				/>
			</div>
		);
	}
}

export default Chart;