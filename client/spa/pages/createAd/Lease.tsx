import React, {Component} from 'react';

export interface IProps {
	onSelectPlace: (name: string, id: string, location: any) => void;
	onNext: () => void;
	defaultValue?: {
		lat: number,
		lng: number,
	};
}

class Lease extends Component<IProps> {

	constructor(props) {
		super(props);

		// Если window имеется, значит это не сервер, и мы можем "лениво" загрузить скрипт google map
		if (window !== void 0) {

			const lazyScript = window.document.createElement('script');
			lazyScript.async = true;
			lazyScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDG6zD5QGwF1c8B3vRrtHghVm0WI
			-poEjA&language=en&libraries=places&callback=initAutocomplete`;

			window.document.body.appendChild(lazyScript);
		}
		this.initAutocomplete = this.initAutocomplete.bind(this);

	}

	// Фунуция collback
	initAutocomplete() {
		const {lat, lng} = this.props.defaultValue;
		const google = window.google;
		const map = new google.maps.Map(this.map, {
			center: {lat, lng},
			zoom: 17,
			mapTypeId: 'roadmap',
		});

		// Create the search box.
		const searchBox = new google.maps.places.SearchBox(this.searchBox);

		// Bias the SearchBox results towards current map's viewport.
		map.addListener('bounds_changed', () => {
			searchBox.setBounds(map.getBounds());
		});

		let markers = [];
		// Listen for the event fired when the user selects a prediction and retrieve
		// more details for that place.
		searchBox.addListener('places_changed', () => {
			const places = searchBox.getPlaces();

			if (places.length === 0) {
				return;
			}

			// Clear out the old markers.
			markers.forEach(marker => {
				marker.setMap(null);
			});
			markers = [];

			// For each place, get the icon, name and location.
			const bounds = new google.maps.LatLngBounds();
			places.forEach(place => {
				if (!place.geometry) {
					console.log('Returned place contains no geometry');
					return;
				}

				// Create a marker for each place.
				markers.push(new google.maps.Marker({
					map,
					title: place.name,
					position: place.geometry.location,
				}));

				this.props.onSelectPlace(place.name, place.id, place.geometry.location);

				if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
			});
			map.fitBounds(bounds);
		});
	}

	componentDidMount() {
		if (window === void 0) {
			return;
		}// Если window отсутствует, значит это серверный рендеринг. На сервере крту мы не рендерим

		window.initAutocomplete = this.initAutocomplete;

		if (window.google !== void 0) {
			this.initAutocomplete();
		}

	}

	render() {
		return (
			<div className='offer-form__item form-group row align-items-center'>
				<label
					htmlFor=''
					className='col-md-4 offer-form__label'
				>
					Place of inspection
				</label>
				<div className='col-md-6'>
					<input
						id='place'
						type='text'
						className='form-control'
						ref={el => this.searchBox = el}
					/>
				</div>
				<div className='map justify-content-end col-md-6 offset-md-4 text-right'>
					<div
						style={{width: 500, height: 500}}
						ref={el => this.map = el}
						className='map__location-irame'
					/>
					<button
						type='submit'
						className='btn orange-btn w-25'
						onClick={this.props.onNext}
					>
						Continue
					</button>
				</div>
			</div>
		);
	}
}

export default Lease;