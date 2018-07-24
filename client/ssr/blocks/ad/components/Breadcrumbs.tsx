import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

export interface ICrumb {
	title: string;
	href: string;
}

const Breadcrumbs = ({breadcrumbs, isLastDisabled = true}: { breadcrumbs: ICrumb[], isLastDisabled?: boolean }) => {
	const indexLastCrumb = breadcrumbs.length - 1;
	return (
		<Breadcrumb>
			{
				breadcrumbs.map((crumb, index) => (
					<BreadcrumbItem
						key={crumb.href.toLowerCase()}
						active={index !== indexLastCrumb}
					>
						{
							isLastDisabled && index !== indexLastCrumb
								? <a href={crumb.href.toLowerCase()} className={'orange-text'}>
									{crumb.title}
								</a>
								: <a>
									{crumb.title}
								</a>
						}
					</BreadcrumbItem>
				))
			}
		</Breadcrumb>
	);
};

export default Breadcrumbs;