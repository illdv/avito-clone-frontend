import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { getCategories } from 'client/ssr/contexts/Breadcrunbs';
import { IBreadcrumb } from 'client/ssr/interfaces/breadcrumbs';

interface BreadcrumbsPublicProps {
	isLastDisabled?: boolean;
}

interface BreadcrumbsPrivateProps {
	breadcrumbs: IBreadcrumb[];
	isLastDisabled?: boolean;
}

const Breadcrumbs = ({ breadcrumbs, isLastDisabled = true }: BreadcrumbsPrivateProps) => {
	const indexLastCrumb = breadcrumbs.length - 1;
	return (
		<Breadcrumb>
			{
				breadcrumbs.map((crumb, index) => (
					<BreadcrumbItem
						key={ crumb.href.toLowerCase() }
						active={ index !== indexLastCrumb }
					>
						{
							isLastDisabled && index !== indexLastCrumb
								? <a href={ crumb.href.toLowerCase() } className={ 'orange-text' }>
									{ crumb.title }
								  </a>
								: <a>
									{ crumb.title }
								  </a>
						}
					</BreadcrumbItem>
				))
			}
		</Breadcrumb>
	);
};

export default (props: BreadcrumbsPublicProps) => getCategories(Breadcrumbs)(props);