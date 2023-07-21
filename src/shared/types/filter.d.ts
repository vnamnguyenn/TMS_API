interface PaginationFilter {
    search: string | null;
    pageNumber: number;
    pageSize: number;
    sortExpression?: string;
    sortDirection?: string;
    isActive?: string | null;
}

interface RequestFilter extends PaginationFilter {
    isAdmin: bool;
    startDate?: string | null;
    endDate?: string | null;
    requestType?: string[] | null;
    status?: string[] | null;
}
export {PaginationFilter, RequestFilter};
