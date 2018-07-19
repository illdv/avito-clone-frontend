import * as React from 'react';
import { shallow } from 'enzyme';
import CategoryCard from '../CategoryCard';
import { categoryMock2 as category } from 'client/ssr/blocks/categories/__mock__/categoryMock';

describe('CategoryCard', () => {
    const props  = {
        category: category,
        img: '/static/img/categories/car.png',
        count: 100,
        textAlign: 'category text-left',
        imageAlign: 'tile__image right',
    };
    const render = shallow(<CategoryCard { ...props }/>);
    test('Render UI', () => {
        expect(render).toMatchSnapshot();
    });
});
