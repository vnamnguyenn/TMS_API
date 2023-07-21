interface CreateRequestStatusDto {
    id: string;
    name: string;
    createdBy: string;
    updatedBy: string;
}

interface GetRequestStatusDto {
    id: string;
    name: string;
    createdDate?: string;
    updatedDate?: string;
}

interface UpdateRequestStatusDto {
    id: string;
    name: string;
    updatedBy: string;
}

export {CreateRequestStatusDto, UpdateRequestStatusDto, GetRequestStatusDto};
