import { AxiosResponse } from 'axios';

export interface IPivot {
    ad_id: number;
    option_id: number;
    value: string;
}

export interface IAds {
    id: number;
    category_id: number;
    type_id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    pivot: IPivot;
}

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

export interface IResponsePagination<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url?: any;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
}

export type ResponseWhitPagination<T> = AxiosResponse<IResponsePagination<T>>;
