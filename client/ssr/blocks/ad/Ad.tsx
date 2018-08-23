import React from 'react';
import { connect } from 'react-redux';

import Breadcrumbs from 'client/ssr/components/AdShowPage/Breadcrumbs';
import SliderImages from 'client/ssr/components/AdShowPage/SliderImages';
import Seller from 'client/ssr/components/AdShowPage/Seller';
import NumberFormat from 'react-number-format';
import { IAdsProps, IAdsState, ICrumb } from 'client/ssr/blocks/ad/interface';
import Feature from 'client/ssr/components/AdShowPage/Feature';
import Description from 'client/ssr/components/AdShowPage/Description';
import Link from 'next/link';
import ButtonFavorites from 'client/ssr/components/AdShowPage/ButtonFavorites';
import Kit from 'client/ssr/components/AdShowPage/Kit';
import PlaceMap from 'client/ssr/components/AdShowPage/PlaceMap';
import { IRootState } from '../../../common/store/storeInterface';
import { UserActions } from '../../../common/entities/user/rootActions';
import Chart from 'client/ssr/components/AdShowPage/Chart/Chart';
import { createAddress } from 'client/ssr/blocks/ad/utils';

require('./Ad.sass');

class Ad extends React.Component <IAdsProps, IAdsState> {
	constructor(props) {
		super(props);
		const queue = this.recurseGetAdCategories(this.props.categories, this.props.ad.category_id);
		const queueCrumbs = this.formatCategoriesToCrumbs(queue);
		const slider = this.formationImages(this.props.ad.images);

		const crumbs: ICrumb[] = [].concat(this.firstCrumbs, queueCrumbs, this.lastCrumbItem);
		const images: IImage[] = [].concat(slider);
		this.state = {
			crumbs,
			lastCrumb: queueCrumbs[queueCrumbs.length - 1],
			images,
			coordinatesMap: {
				lat: this.props.ad.latitude,
				lng: this.props.ad.longitude,
			},
			isFavorite: false,
		};
	}

	static getDerivedStateFromProps(props: IAdsProps) {
		let isFavorite;
		try {
			isFavorite = props.user.favorites.ids.indexOf(props.ad.id) !== -1;
		} catch (e) {
			console.log(e);
		}
		return { isFavorite };
	}

	formatCategoriesToCrumbs = (categories): ICrumb[] => {
		return categories.map(category => {
			const cityId = this.props.ad.city.city_id;
			const categoryId = encodeURI(category.id);
			return {
				title: category.title,
				href: `/search?city_id=${cityId}&category_id=${categoryId}`,
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

	formationImages = (images): IImage[] => {
		return images.map(image => {
			return {
				original: image.file_url,
				thumbnail: image.file_url,
			};
		});
	}

	get firstCrumbs(): ICrumb {
		return {
			title: 'All listings in ' + this.props.ad.city.title,
			// href: encodeURI('/' + this.props.ad.city.title),
			href: encodeURI(`/search?city_id=${this.props.ad.city.city_id}`),

		};
	}

	get lastCrumbItem(): ICrumb {
		return {
			title: this.props.ad.title,
			href: encodeURI('/' + this.props.ad.title.toLowerCase()),
		};
	}

	selectFavorite = (id: number) => {
		UserActions.favorites.selectFavorite.REQUEST({ id });
	}

	render() {
		const { similar, ad, user } = this.props;
		const { crumbs, lastCrumb, images, isFavorite, coordinatesMap } = this.state;
		const adAddress = createAddress(ad.city);

		return (
			<>
				<section className='heading'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-9'>
								<Breadcrumbs breadcrumbs={crumbs}/>
							</div>
							<div className='col-md-3'>
								<div className='back-next'>
									<a href={`${lastCrumb.href}`}>
										<a className='back-next__link orange-text'>Back</a>
									</a>
									{
										ad.next_ad &&
										<Link href={`/ad/${ad.next_ad}`}>
											<a className='back-next__link orange-text'>Next
												<i className='fas fa-arrow-right p-l-5 f-s-12 orange-text'/>
											</a>
										</Link>
									}
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col-md-12 col-lg-8'>
								<h1 className='ad-page__title'>{ad.title}</h1>
								<h6 className='f-w-400 m-b-15'>
									№ <span>{ad.id}</span>,
									added <span>{ad.created_at}</span>
								</h6>
								<span>
									<i className='fas fa-sync-alt orange-text'/>
									<span> {ad.updated_at} </span>
								</span>
								<span className='p-l-15'>
									<i className='fas fa-eye orange-text'/>
									<span> {ad.total_visits} </span>
									(Today's <span> {ad.today_visits}</span>)
								</span>
								<ButtonFavorites
									id={ad.id}
									selectFavorite={this.selectFavorite}
									isFavorite={isFavorite}
								/>
							</div>
							<div className='col-md-12 col-lg-4 price my-md-3 my-lg-0'>
								<NumberFormat
									value={ad.price}
									displayType={'text'}
									suffix={'$'}
									thousandSeparator={' '}
								/>
							</div>
						</div>
						<div className='row p-y-20'>
							<SliderImages images={images}/>
							<Feature options={ad.options}/>
						</div>
						<div className='row'>
							<Seller
								adId={ad.id}
								seller={ad.user}
								city={ad.city.title}
								country={ad.city.country.title}
								user={user}
							/>
						</div>
					</div>
				</section>
				<section className='section-mb'>
					<div className='container'>
						<Description body={ad.description}/>
						<Kit/>
						<PlaceMap
							address={adAddress}
							city={ad.city}
							coordinatesMap={coordinatesMap}
						/>
						<Chart
							similar_ads={similar}
							id_parent={ad.id}
							price_histories={ad.price_histories}
						/>
					</div>
				</section>
			</>
		);
	}
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

export default connect(mapStateToProps)(Ad);