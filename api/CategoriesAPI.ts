import { AxiosWrapper } from './AxiosWrapper';

function getCategories() {
	return AxiosWrapper.get('/categories');
}

function getCategory(categoryId) {
	return AxiosWrapper.get(`/category/${categoryId}`);
}

function createCategory(category) {
	return AxiosWrapper.post('/categories', category);
}

function putCategory(categoryId) {
	return AxiosWrapper.put(`/category/${categoryId}`);
}

function deleteCategory(categoryId) {
	return AxiosWrapper.deleteResponse(`/category/${categoryId}`);
}

export const CategoriesAPI = {
	getCategories,
	getCategory,
	createCategory,
	putCategory,
	deleteCategory,
};