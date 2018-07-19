import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

export interface ICrumb {
	name: string;
	href: string;
}

const Breadcrumbs = ({ breadcrumbs, isLastDisabled }: { breadcrumbs: ICrumb[], isLastDisabled }) => {
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
									{ crumb.name }
								  </a>
								: <a>
									{ crumb.name }
								  </a>
						}
					</BreadcrumbItem>
				))
			}
		</Breadcrumb>
	)
}

export default Breadcrumbs;