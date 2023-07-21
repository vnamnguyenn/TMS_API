export interface IRequestType {
    id: string;
    name: string;
    isActive?: boolean;
    description?: string;
    createdDate?: string;
    updatedDate?: string;
}

export interface IRequestTypeList extends IRequestType {
    totalRecords: number;
}
