export const categoryMock  = {
    title: 'Pets',
    description: 'Cool pets',
    parent_id: '1',
    children: [],
    total_options: [
        {
            id: 1,
            category_id: 1,
            type_id: 1,
            name: 22,
        },
        {
            id: 2,
            category_id: 2,
            type_id: 2,
            name: 23,
        },
    ]
};
export const categoryMock2 = {
    title: 'Car',
    description: 'Great car',
    parent_id: 'null',
    children: [categoryMock, categoryMock],
    total_options: [
        {
            id: 1,
            category_id: 1,
            type_id: 1,
            name: 22,
        },
        {
            id: 2,
            category_id: 2,
            type_id: 2,
            name: 23,
        },
    ]
};
