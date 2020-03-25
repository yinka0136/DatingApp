export interface Pagination {
  totalElements: number;
  last: boolean;
  totalPages: number;
  size: number;
  number: number;
}

export class PaginatedResult<T> {
  content: T;
  pageable: Pagination;
  totalElements: any;
  totalPages: any;
}
