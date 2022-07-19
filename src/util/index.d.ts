/**
 * 分页参数
 */
export type PaginationParams<T> = {
    current?: number;
    pageSize?: number;
} & Partial<T>;
