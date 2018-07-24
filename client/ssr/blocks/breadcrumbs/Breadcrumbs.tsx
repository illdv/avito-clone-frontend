import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

export interface IBreadcrumb {
	title: string;
	href: string;
}

interface IBreadcrumbsPublicProps {
	isLastDisabled?: boolean;
}

interface IBreadcrumbsPrivateProps {
	breadcrumbs: IBreadcrumb[];
	isLastDisabled?: boolean;
	classNameForContainer?: string;
	classNameForItem?: string;
}

const defaultProps = {
	isLastDisabled: true,
	classNameForContainer: '',
	classNameForItem: '',
};

export const Breadcrumbs = (props: IBreadcrumbsPrivateProps) => {
	const { breadcrumbs, isLastDisabled, classNameForContainer, classNameForItem } = { ...defaultProps, ...props };

	const indexLastCrumb = breadcrumbs.length - 1;
	return (
		<ol className={classNameForContainer}>
			{
				breadcrumbs.map((crumb, index) => (
					<li
						className={classNameForItem}
						key={crumb.href.toLowerCase()}
					>
						{
							isLastDisabled && index !== indexLastCrumb
								? <a
									href={crumb.href.toLowerCase()}
									className={'orange-text'}
								>
									{crumb.title}
								</a>
								: <a>
									{crumb.title}
								</a>
						}
					</li>
				))
			}
		</ol>
	);
};

export default Breadcrumbs;