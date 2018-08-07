import * as React from 'react';
import { createContext } from 'react';
import { connect, Dispatch } from 'react-redux';

export interface IState {

}

export interface IProps {
	query: any;
}

export interface IQuery {
	category?: string;
	city_id?: string;
	price_from?: string;
	search?: string;
}

const { Provider, Consumer } = createContext<IQuery>(null);

class SetQuery extends React.Component<IProps, IState> {

	state: IState = {};

	render() {
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

export default SetQuery;