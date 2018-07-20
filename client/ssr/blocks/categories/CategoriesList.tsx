import * as React from 'react';
import CategoryCard from 'client/ssr/blocks/categories/CategoryCard'
import { ICategories } from 'client/ssr/blocks/categories/interface'

interface ICategoriesList {
    categories: ICategories;
}

const CategoriesList: React.SFC<ICategoriesList> = ({ categories }) => {
    const error        = <div> Category not redy on backend</div>;
    const bottomButton = <div className='tile tile-categories'>
        <div className='tile__inner'>
            <div className='category text-left'>
                <h4 className='category__caption p-b-20'>All categories</h4>
                <a
                    href='/category'
                    className='btn grey-btn'
                >
                    Select products
                    <span className='p-x-5'>
													<i className='fas fa-arrow-right' />
												</span>
                </a>
            </div>
        </div>
    </div>;
    return (
        <div className='tiles'>
            {categories[1] ?
                <CategoryCard
                    category={categories[1]}
                    img='/static/img/categories/car.png'
                    textAlign='category text-right'
                />
                : error
            }
            {categories[5] ?
                <CategoryCard
                    category={categories[5]}
                    img='/static/img/categories/property.png'
                    imageAlign='tile__image right'
                    textAlign='category text-left'
                />
                : error
            }
            {categories[7] ?
                <CategoryCard
                    category={categories[7]}
                    vertical={true}
                    img='/static/img/categories/dog.png'
                    imageAlign='tile__image_vertical'
                />
                : error
            }
            {categories[2] ?
                <CategoryCard
                    category={categories[2]}
                    img='/static/img/categories/mac.png'
                    textAlign='category text-left'
                    imageAlign='tile__image right'
                />
                : error
            }
            {categories[4] ?
                <CategoryCard
                    category={categories[4]}
                    img='/static/img/categories/kitchen.png'
                    textAlign='category text-right'

                />
                : error
            }
            {categories[6] ?
                <CategoryCard
                    category={categories[6]}
                    img='/static/img/categories/shirt.png'
                    textAlign='category text-right'
                />
                : error
            }
            {categories[3] ?
                <CategoryCard
                    category={categories[3]}
                    img='/static/img/categories/job.png'
                    vertical={true}
                    imageAlign='tile__image_vertical'
                />
                : error
            }
            {categories[8] ?
                <CategoryCard
                    category={categories[8]}
                    img='/static/img/categories/work.png'
                    textAlign='category text-right'
                />
                : error
            }
            {categories[4] ?
                <CategoryCard
                    category={categories[4]}
                    img='/static/img/categories/tennis.png'
                    textAlign='category text-left'
                    imageAlign='tile__image right'
                />
                : error
            }
            {bottomButton}
        </div>
    );
};

export default CategoriesList;
