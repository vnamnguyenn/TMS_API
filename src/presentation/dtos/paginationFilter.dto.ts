export interface PaginationFilterDto {
    search: string | null;
    pageNumber: number;
    pageSize: number | null;
    sortExpression: string;
    sortDirection: string;
}
