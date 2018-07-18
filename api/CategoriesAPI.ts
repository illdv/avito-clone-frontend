import { AxiosWrapper } from 'api/AxiosWrapper';
import { IRequestCreateCategory, IResponseCategories } from 'client/ssr/blocks/categories/interface'
import { AxiosPromise } from 'axios'

function getCategories(): AxiosPromise<IResponseCategories> {
  return AxiosWrapper.get('/categories');
}

function getCategory(categoryId) {
  return AxiosWrapper.get(`/category/${categoryId}`);
}

function createCategory(category: IRequestCreateCategory) {
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
  deleteCategory
};
