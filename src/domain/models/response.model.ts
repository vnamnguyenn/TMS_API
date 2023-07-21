interface ResponseStatus {
    status: {
        code: number;
        message: string;
    };
}

interface CreateResponse extends ResponseStatus {
    data: {
        id: string;
    };
}

interface ItemResponse<T> {
    data: T;
}

interface ItemsResponse<T> {
    totalRecords?: number;
    currentPage?: number;
    totalPages?: number;
    data: T[];
}

export {ResponseStatus, CreateResponse, ItemResponse, ItemsResponse};
