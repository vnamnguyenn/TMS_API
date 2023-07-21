export interface IRequestStatus {
    id: string;
    name: string;
    createdDate: string;
    updatedDate: string;
}

export interface IRequestStatusList extends IRequestStatus {
    totalRecords: number;
}
