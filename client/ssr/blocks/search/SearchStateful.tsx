import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import { bindModuleAction } from 'client/common/entities/user/utils';
import { ISearchActions, SearchActions } from 'client/common/search/actions';
import { getQueryLoop } from 'client/ssr/contexts/QueryContext';
import Search, { IDataForSearch } from 'client/ssr/blocks/search/Search';
import { ISearchState } from 'client/common/search/store';
import { getSearchUrlLoop } from 'client/ssr/contexts/SearchUrlContext';
import { queryStringifyPlus } from 'server/router/utils';
import { isServer, pushInRouter } from 'client/common/utils/utils';
import { getLocationState } from 'client/common/store/selectors';
import { ILocationStoreState } from 'client/common/location/module';
import { clearObject, extractCategoryId, extractRangePrice, getSelectedOptions } from 'client/ssr/blocks/search/utils';

export interface ILocationBreadcrumbs {
	country_id?: number;
	region_id?: number;
	city_id?: number;
	title?: string;
}

export interface ISearchBreadcrumbs {
	categories: ICategory[];
	location: ILocationBreadcrumbs;
}

export interface IState {

}

export interface IProps {
	searchActions: ISearchActions;
	search?: ISearchState;
	locationState: ILocationStoreState;
}

const mapStateToProps = (state: IRootState) => ({
	search: state.search,
	locationState: getLocationState(state),
});

const mapDispatchToProps = dispatch => ({
	searchActions: bindModuleAction(SearchActions, dispatch),
});

class SearchStateful extends Component<IProps, IState> {

	state: IState = {};

	componentWillMount(): void {
		if (!isServer()) {
			const { searchActions } = this.props;
			console.log('componentWillMount getQueryLoop = ', getQueryLoop());
			searchActions.initialize.REQUEST({ query: getQueryLoop(), queryString: getSearchUrlLoop() });
		}
	}

	onSearch = (data: IDataForSearch) => {

		const idCity = this.props.locationState.local.idCity;
		let idRegion = null;
		let idCountry = null;

		if (!idCity) {
			idRegion = this.props.locationState.local.idRegion;
			if (!idRegion) {
				idCountry = this.props.locationState.local.idCountry;
			}
		}

		const { rangePrice, searchString, options, selectedCategories } = data;

		const idSelectedCategory = extractCategoryId(selectedCategories);
		const whereBetween       = extractRangePrice(rangePrice);
		const selectedOptions    = getSelectedOptions(options);

		const query: any = {
			whereLike: {
				title: searchString,
				body: searchString,
				description: searchString,
			},
			category_id: idSelectedCategory,
			city_id: idCity,
			region_id: idRegion,
			country_id: idCountry,
			type: rangePrice.priceType,
			whereBetween,
			options: selectedOptions,
		};

		const clearQuery  = clearObject(query);
		const queryParams = queryStringifyPlus(clearQuery);
		const href        = `/search?${queryParams}`;

		pushInRouter(href);
	}

	localeName() {
		const { idCity, idRegion, idCountry } = this.props.locationState.local;

		if (idCity) {
			if (this.props.locationState.loaded.local.cities.length > 0) {

				const result = this.props.locationState.loaded.local.cities.filter(city => {
					return city.city_id === idCity;
				});

				if (result.length > 0) {
					return result[0].title;
				}
			}
		}

		if (idRegion) {
			if (this.props.locationState.loaded.local.regions.length > 0) {
				const result = this.props.locationState.loaded.local.regions.filter(region => {
					return region.region_id === idRegion;
				});
				if (result.length > 0) {
					return result[0].title;
				}
			}
		}

		if (idCountry) {
			if (this.props.locationState.loaded.local.countries.length > 0) {
				const result = this.props.locationState.loaded.local.countries.filter(country => {
					return country.country_id === idCountry;
				});
				if (result.length > 0) {
					return result[0].title;
				}
			}
		}

		return 'World';
	}

	render() {

		const { query, queryString } = this.props.search;

		return (
			<Search
				onSearch={this.onSearch}
				locationName={this.localeName()}
				query={query}
				urlString={queryString}
				priceRange={true}
			/>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchStateful);