import * as React from 'react';
import { Component, ReactElement } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import { bindModuleAction } from 'client/common/entities/user/utils';
import { ISearchActions, SearchActions } from 'client/common/search/actions';
import { getQueryLoop } from 'client/ssr/contexts/QueryContext';
import Search from 'client/ssr/blocks/search/Search';

export interface IState {

}

export interface IProps {
	searchActions: ISearchActions;
}

const mapStateToProps = (state: IRootState) => ({
	search: state.search,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	searchActions: bindModuleAction(SearchActions, dispatch),
});

class SearchStateful extends Component<IProps, IState> {

	state: IState = {};

	componentDidMount(): void {
		const { searchActions } = this.props;
		searchActions.initialization.REQUEST({ query: getQueryLoop() });
	}

	onSearch = () => {

	}

	render() {
		return <Search onSearch={this.onSearch()} priceRange={true} />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchStateful);