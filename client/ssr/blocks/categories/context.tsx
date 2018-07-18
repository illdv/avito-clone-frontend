import React from 'react';

export const CategoriesContext = React.createContext([]); // ICategories

interface ICategoriesProvider {
	categories: any[]; // ICategories
}

export class CategoriesProvider extends React.Component<ICategoriesProvider> {
	render() {
		const { categories, children } = this.props;
		return (
			<CategoriesContext.Provider value={categories}>
				{children}
			</CategoriesContext.Provider>
		);
	}
}

export default CategoriesContext;
