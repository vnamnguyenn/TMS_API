export interface IRequestReason {
    id?: string;
    name?: string;
    requestTypeId?: string;
    description?: string;
    createdDate?: string;
    updatedDate?: string;
}

export interface IRequestReasonList extends IRequestReason {
    totalRecords: number;
    requestTypeName?: string;
}
