interface CreateRequestTypeDto {
    name: string;
    description: string;
    createdBy: string;
    updatedBy: string;
}

interface GetRequestTypeDto {
    id?: string;
    name?: string;
    isActive?:boolean,
    description?: string;
    createdDate?: string;
    updatedDate?: string;
}

interface UpdateRequestTypeDto {
    id: string;
    name: string;
    description: string;
    updatedBy: string;
}
export {CreateRequestTypeDto, UpdateRequestTypeDto, GetRequestTypeDto};
