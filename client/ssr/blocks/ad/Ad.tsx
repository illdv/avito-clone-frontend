import React from 'react';

import Breadcrumbs from './components/Breadcrumbs';
import SliderImages from './components/SliderImages';
import Seller from './components/Seller';
import Chart from './components/Chart';
import NumberFormat from 'react-number-format';
import { IAdsProps, IAdsState, ICrumb } from 'client/ssr/blocks/ad/interface';
import Feature from 'client/ssr/blocks/ad/components/Feature';
import Description from 'client/ssr/blocks/ad/components/Description';
import Link from 'next/link';
import ButtonFavorites from 'client/ssr/blocks/ad/components/ButtonFavorites';

require('./Ad.sass');

const images = [
	{
		original: '/static/img/ads/ads.png',
		thumbnail: '/static/img/ads/ads.png',
	},
	{
		original: '/static/img/ads/ads.png',
		thumbnail: '/static/img/ads/ads.png',
	},
	{
		original: '/static/img/ads/ads.png',
		thumbnail: '/static/img/ads/ads.png',
	},
	{
		original: '/static/img/ads/ads.png',
		thumbnail: '/static/img/ads/ads.png',
	},
	{
		original: '/static/img/ads/ads.png',
		thumbnail: '/static/img/ads/ads.png',
	},
];

const user = {
	name: 'Andrey Beregovoi',
	avatar: '/static/img/person.png',
	address: 'Germany Berlin',
	phone: '89995965664642',
};

class Ads extends React.Component <IAdsProps, IAdsState> {
	formatCategoriesToCrumbs = (categories): ICrumb[] => {
		return categories.map(category => {
			return {
				title: category.title,
				href: '/' + encodeURI(category.title),
			};
		});
	}

	recurseGetAdCategories = (categories, idCategoryAd): any[] | null => {
		return categories.reduce((acc, category) => {
			if (acc) {
				return acc;
			}

			if (category.id === idCategoryAd) {
				return [category];
			} else {
				if (category.children.length > 0) {
					const result = this.recurseGetAdCategories(category.children, idCategoryAd);

					if (result !== null) {
						return [category].concat(result);
					} else {
						return null;
					}
				} else {
					return null;
				}
			}
		}, false);
	}

	constructor(props) {
		super(props);

		const queue       = this.recurseGetAdCategories(this.props.categories, this.props.ad.category_id);
		const queueCrumbs = this.formatCategoriesToCrumbs(queue);

		const crumbs: ICrumb[] = [].concat(this.firstCrumbs, queueCrumbs, this.lastCrumbItem);

		this.state = {
			crumbs,
			lastCrumb: queueCrumbs[queueCrumbs.length - 1],
		};
	}

	get firstCrumbs(): ICrumb {
		return {
			// title: 'All listings in ' + this.props.ad.city.title,
			title: 'All listings in ' + 'Moscow',
			// href: encodeURI('/' + this.props.ad.city.title),
			href: encodeURI('/' + 'moscow'),
		};
	}

	get lastCrumbItem(): ICrumb {
		return {
			title: this.props.ad.id,
			href: encodeURI('/' + this.props.ad.id),
		};
	}

	render() {
		return (
			<React.Fragment>
				<section className='heading'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-10'>
								<Breadcrumbs breadcrumbs={this.state.crumbs} />
							</div>
							<div className='col-md-2 back-next'>
								<Link href={`${this.state.lastCrumb.href}`}>
									<a className='orange-text'>
										Back
									</a>
								</Link>
								<Link href={`${this.props.ad.next_ad}`}>
									<a className='p-x-5 orange-text'>Next <i className='fas fa-arrow-right p-l-5 orange-text' />
									</a>
								</Link>
							</div>
						</div>
						<div className='row'>
							<div className='col-md-12 col-lg-8'>
								<h1 className='m-b-15'>{this.props.ad.title}</h1>
								<h5 className='f-s-14 f-w-400 m-b-15'>№ <span>{this.props.ad.id}</span>,
									added <span>{this.props.ad.created_at}</span></h5>
								<span className='f-s-14'>
							<i className='fas fa-sync-alt orange-text' />
							<span> {this.props.ad.updated_at} </span>
						</span>
								<span className='f-s-14'>
							<i className='fas fa-eye orange-text' />
							<span> {this.props.ad.total_visits} </span>
							(Today's <span> {this.props.ad.today_visits}</span>)
						</span>
								<ButtonFavorites id={this.props.ad.id} is_favorite={this.props.ad.is_favorite}/>
							</div>
							<div className='col-md-12 col-lg-4'>
						<span className='price'>
							<NumberFormat
								value={this.props.ad.price}
								displayType={'text'}
								suffix={'$'}
								thousandSeparator={' '}

							/>
						</span>
							</div>
						</div>
						<div className='row p-y-20'>
							<SliderImages images={images} />
							<Feature options={this.props.ad.options} />
						</div>
						<div className='row'>
							{/*<Seller seller={this.props.ad.user} city={this.props.ad.city.title} country={this.props.ad.city.country.title} />*/}
						</div>
					</div>
				</section>
				<section className='section-mb'>
					<div className='container'>
						<Description body={this.props.ad.body} />
						{/*<VehicleKit />*/}
						{/*<Chart randomAd={this.props.ad.random_ad}/>*/}
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default Ads;