import React from 'react';
import { IFeatureAdProps } from 'client/ssr/blocks/ad/interface';
import { IOption } from 'client/common/entities/user/modules/owned-ads/interfaces';

const Feature = ({ options }: IFeatureAdProps) => (
	<div className='col-lg-5 px-lg-3 py-md-4 py-lg-0'>
		{/*<h3 className='caption'>Vehicle Features</h3>*/}
		<h3>Features</h3>
		<ul className='ads-features'>
			{
				options.map(option => (
					<ListItemOption
						key={option.id}
						id={option.id}
						name={option.name}
						pivot={option.pivot}
					/>
				))
			}
		</ul>
	</div>
);

const ListItemOption = ({id, name, pivot}: IOption) => {
	const key = name.replace('_', ' ');
	return (
		<li key={id}>
			<span className='grey-text'>
				{key.charAt(0).toUpperCase() + key.substr(1)}:</span> {pivot.value}
		</li>
	);
};

export default Feature;