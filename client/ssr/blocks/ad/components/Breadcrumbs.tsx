import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

export interface ICrumb {
    name: string;
    href: string;
}

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: ICrumb[] }) => {
    const indexLastCrumb = breadcrumbs.length - 1;
    return (
        <Breadcrumb>
            {
                breadcrumbs.map((crumb, index) => (
                    <BreadcrumbItem
                        key={ crumb.href }
                        active={ index !== indexLastCrumb }
                    >
                        <a href={ crumb.href } className={ 'orange-text' }>
                            { crumb.name }
                        </a>
                    </BreadcrumbItem>
                ))
            }
        </Breadcrumb>
    )
}

export default Breadcrumbs;