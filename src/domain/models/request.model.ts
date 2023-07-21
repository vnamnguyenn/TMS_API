export interface IRequest {
    requestId: string;
    createdDate: string;
    updatedDate?: string;
    startDate: string;
    endDate: string;
    statusId: string;
    statusName: string;
    approverEmail?: string;
    approverId: string;
    approverName: string;
    userId: string;
    requesterId: string;
    requesterName: string;
    requesterEmail: string;
    supervisorId?: string;
    supervisorName: string;
    supervisorEmail?: string;
    comment: string;
    partialDayId: number;
    partialDayName: string;
    requestTypeId?: string;
    requestTypeName: string;
    requestReasonId?: string;
    requestReasonName: string;
    informToId: string;
    informToName: string;
    detailReason: string;
}

export interface IRequestList extends IRequest {
    totalRecords: number;
}
