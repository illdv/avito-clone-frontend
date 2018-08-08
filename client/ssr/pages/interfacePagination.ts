import { AxiosResponse } from 'axios';

export interface IPagination {
  /**
   * Current page number.
   */
  current_page: number;
  /**
   * Last page number.
   */
  last_page: number;
  /**
   * On current page count items.
   */
  per_page: number;
  /**
   * Count all items.
   */
  total: number;
}

export interface IResponsePagination<T> extends IPagination {
  data: T[];
  first_page_url: string;
  from: number;
  last_page_url: string;
  next_page_url?: any;
  path: string;
  prev_page_url?: any;
  to: number;
}

export type ResponseWhitPagination<T> = AxiosResponse<IResponsePagination<T>>;
