import React from 'react';
import Link from 'next/link';
import { extractPreviewImage } from 'client/ssr/blocks/ad/utils';

interface  IProps {
	ad: IAd;
	favoritesIds: number[];
	addToFavorites(id: number): void;
}

class  AdCard extends React.Component<IProps> {

	handleAddToFavorites = () => {
		this.props.addToFavorites(this.props.ad.id);
	}

	get isActive() {
		return this.props.favoritesIds.indexOf(this.props.ad.id) !== -1;
	}

	get activeLike() {
		return (
			<svg
				className='like'
				width='20'
				height='18'
				viewBox='0 0 18 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				onClick={this.handleAddToFavorites}
			>
				<path
					d='M10.9483 5.54749L10.8833 5.85H11.1927H16.3636C17.1317 5.85 17.75 6.45614 17.75 7.2V8.8C17.75
					8.9724 17.7166 9.13183 17.6548 9.28751L15.1856 14.9237L15.1855 14.9237L15.1846 14.926C14.9785
					15.4095 14.4884 15.75 13.9091 15.75H6.54545C6.17598 15.75 5.82273 15.6064 5.56315 15.3526C5.30376
					15.099 5.15909 14.7562 5.15909 14.4V6.4C5.15909 6.0305 5.30962 5.69402 5.5666 5.44275L10.7763
					0.348839L11.4679 1.01875C11.4681 1.01888 11.4682 1.01901 11.4683 1.01914C11.6437 1.19077 11.7527
					1.43123 11.7527 1.688C11.7527 1.7608 11.7459 1.83143 11.7335 1.89276C11.7334 1.89314 11.7333 1.89352
					11.7333 1.8939L10.9483 5.54749ZM3.02273 6.65V15.75H0.25V6.65H3.02273Z'
					/*change fill to #FFB91B if offer is in favorites or on click*/
					fill={'#FFB91B'}
					stroke='#FFB91B'
					strokeWidth='0.5'
				/>
			</svg>
		);
	}

	get noActiveLike() {
		return (
			<div>
				{/* TODO KASTIL */}
				<svg
					className='like'
					width='20'
					height='18'
					viewBox='0 0 18 16'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					onClick={this.handleAddToFavorites}
				>
					<path
						d='M10.9483 5.54749L10.8833 5.85H11.1927H16.3636C17.1317 5.85 17.75 6.45614 17.75 7.2V8.8C17.75
						8.9724 17.7166 9.13183 17.6548 9.28751L15.1856 14.9237L15.1855 14.9237L15.1846 14.926C14.9785
						15.4095 14.4884 15.75 13.9091 15.75H6.54545C6.17598 15.75 5.82273 15.6064 5.56315 15.3526C5.30376
						15.099 5.15909 14.7562 5.15909 14.4V6.4C5.15909 6.0305 5.30962 5.69402 5.5666 5.44275L10.7763
						0.348839L11.4679 1.01875C11.4681 1.01888 11.4682 1.01901 11.4683 1.01914C11.6437 1.19077 11.7527
						1.43123 11.7527 1.688C11.7527 1.7608 11.7459 1.83143 11.7335 1.89276C11.7334 1.89314 11.7333 1.89352
						11.7333 1.8939L10.9483 5.54749ZM3.02273 6.65V15.75H0.25V6.65H3.02273Z'
						/*change fill to #FFB91B if offer is in favorites or on click*/
						fill={'white'}
						stroke='#FFB91B'
						strokeWidth='0.5'
					/>
				</svg>
			</div>
		);
	}

	render() {
		const { ad } = this.props;
		return (
			<div className='ad__card'>
				<div className='ad__img'>
					{ this.isActive ? this.activeLike : this.noActiveLike }
					<img
						src={extractPreviewImage(ad)}
						alt='Dogs'
					/>
				</div>
				<div className='ad__info'>
					<Link href={`/ad/${ad.id}`}>
						<a><h6 className='ad__title'>{ad.title}</h6></a>
					</Link>
					<span>{ ad.price }</span>
					<span>{ ad.description.slice(0, 110) + '...' }</span>
					<span>{ ad.updated_at }</span>
				</div>
			</div>
		);
	}
}

export default AdCard;