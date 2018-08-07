import React, { createContext } from 'react';

export type Category = any[];

const { Provider, Consumer } = createContext<Category>(null);

interface IProviderProps {
	categories: Category; // ICategories
}

export class SetCategories extends React.Component<IProviderProps> {
	render() {
		const { categories, children } = this.props;
		return (
			<Provider value={categories}>
				{children}
			</Provider>
		);
	}
}

export const ConsumerCategories = Consumer;

export const getCategories = Component => props => (
	<Consumer>
		{(categories: Category) => <Component {...props} categories={categories} />}
	</Consumer>
);