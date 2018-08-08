import * as React from 'react';
import { createContext } from 'react';
import { connect, Dispatch } from 'react-redux';

export interface IState {

}

export interface IProps {
	query: any;
}

export interface IQuery {
	category_id?: number;
	country_id?: number;
	region_id?: number;
	city_id?: string;
	price_from?: string;
	search?: string;
}

let loop: IQuery;

const { Provider, Consumer } = createContext<IQuery>(null);

class SetQuery extends React.Component<IProps, IState> {

	state: IState = {};

	render() {
		loop = this.props.query;
		return (
			<Provider value={this.props.query} >
				{this.props.children}
			</Provider >
		);
	}
}

export const getQuery = Component => props => (
	<Consumer >
		{(query: IQuery) => <Component {...props} query={query} />}
	</Consumer >
);

export const getQueryLoop = (): IQuery => loop;

export default SetQuery;