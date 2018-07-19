import React from 'react';

interface ISubcategoryLink {
	path: string;
	title: string;
	total: string;
}

interface ISubcategoryLinksProps {
	subcategoryLinks: ISubcategoryLink[];
}

class SubcategoryLinks extends React.Component<ISubcategoryLinksProps> {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			null
		);
	}
}

export default SubcategoryLinks;