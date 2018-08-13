import * as React from 'react';
import { createContext } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IQuery } from 'client/common/search/interface';

export interface IState {

}

export interface IProps {
	query: any;
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