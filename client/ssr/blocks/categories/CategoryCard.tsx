import * as React from 'react';

interface ICategoryCard {
	category: ICategory;
	img: string;
	textAlign?: string;
	imageAlign?: string;
	vertical?: boolean;
}

const CategoryCard: React.SFC<ICategoryCard> = data => {

	const {category, vertical, img, textAlign = 'category', imageAlign = 'tile__image'} = data;

	const card = (
		<a
			href={`/search/?category=${ category.id }`}
			className={vertical ? 'tile_vertical' : 'tile'}
		>
			<div className='tile__inner'>
				<div className={textAlign}>
					<h4 className='category__caption'>{category.title}</h4>
					<span className='category__count'>{category.total_ads_count} ads</span>
				</div>
				<div className={imageAlign}>
					<img
						src={img}
						alt=''
					/>
				</div>
			</div>
		</a>
	);
	return (category.title ? card : null);
};

export default CategoryCard;
