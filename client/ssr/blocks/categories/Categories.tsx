import React from 'react';
import CategoriesContext from 'client/ssr/blocks/categories/context';
import CategoriesList from 'client/ssr/blocks/categories/CategoriesList'
import { ICategories } from 'client/ssr/blocks/categories/interface'

require('./Categories.sass');

interface CategoriesComponent {
    categories: ICategories;
}

const Categories: React.SFC<CategoriesComponent> = () => {
    const CategoriesListEmpty = <div>We does not have any categories</div>;
    return (
        <section className='section-xs'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 '>
                        <h3 className='main-caption'>Categories</h3>
                    </div>
                </div>
                <div className='row p-y-20'>
                    <div className='col-12'>
                        <CategoriesContext.Consumer>
                            {
                                categories => (
                                    categories[8].title ?
                                        <CategoriesList categories={categories} /> :
                                        CategoriesListEmpty
                                )
                            }
                        </CategoriesContext.Consumer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;