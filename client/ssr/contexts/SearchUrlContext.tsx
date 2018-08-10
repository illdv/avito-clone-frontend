import * as React from 'react';
import { createContext } from 'react';
import { connect, Dispatch } from 'react-redux';

export interface IState {

}

export interface IProps {
	searchUrl: string;
}

let loop: string;

const { Provider, Consumer } = createContext<string>(null);

class SetSearchUrl extends React.Component<IProps, IState> {

	state: IState = {};

	render() {
		loop = this.props.searchUrl;
		return (
			<Provider value={this.props.searchUrl} >
				{this.props.children}
			</Provider >
		);
	}
}

export const getSearchUrl = Component => props => (
	<Consumer >
		{(searchUrl: string) => <Component {...props} searchUrl={searchUrl} />}
	</Consumer >
);

export const getSearchUrlLoop = (): string => loop;

export default SetSearchUrl;