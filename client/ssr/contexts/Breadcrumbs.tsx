import React from 'react';

import { IBreadcrumb } from '../interfaces/breadcrumbs';

const { Provider, Consumer } = React.createContext<IBreadcrumb[]>(null);

interface IProviderProps {
	breadCrumbs: IBreadcrumb[]; // IBreadcrumb
}

export class SetBreadcrumbs extends React.Component<IProviderProps> {
	render() {
		const { breadCrumbs, children } = this.props;
		return (
			<Provider value={ breadCrumbs }>
				{children}
			</Provider>
		);
	}
}

export const getBreadcrumbs = Component => props => (
	<Consumer>
		{ (breadcrumbs: IBreadcrumb[]) => <Component { ...props } breadcrumbs={ breadcrumbs } /> }
	</Consumer>
);