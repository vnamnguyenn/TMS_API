import {GetRequestReasonDto} from './requestReason.dto.js';
import {GetPartialDayDto} from './partialDay.dto.js';
import {GetRequestStatusDto} from './requestStatus.dto.js';
import {GetUserDto} from './user.dto.js';
import {GetRequestTypeDto} from './requestType.dto.js';
interface CreateRequestDto {
    id: string;
    userId: string;
    requestTypeId: string;
    requestReasonId: string;
    partialDayId: number;
    statusId: string;
    supervisor: string;
    approver: string;
    informTo: string;
    detailReason: string;
    expectedDate: string;
    startDate: string;
    endDate: string;
    createdBy: string;
    updatedBy: string;
    createdDate: string;
    updatedDate: string;
}

interface GetRequestDto {
    id?: string;
    requestType?: GetRequestTypeDto | string;
    requestReason?: GetRequestReasonDto | string;
    partialDay?: GetPartialDayDto | string;
    status?: GetRequestStatusDto;
    supervisor?: GetUserDto;
    approver?: GetUserDto;
    requester?: GetUserDto;
    informTo?: GetUserDto;
    duration?: number;
    comment?: string;
    detailReason?: string;
    expectedDate?: string;
    startDate?: string;
    endDate?: string;
    createdDate?: string;
    updatedDate?: string;
}

interface UpdateRequestDto {
    id: string;
    userId: string;
    requestTypeId: string;
    requestReasonId: string;
    partialDayId: number;
    statusId: string;
    supervisor: string;
    approver: string;
    informTo: string;
    detailReason: string;
    expectedDate: string;
    startDate: string;
    endDate: string;
    updatedBy: string;
    updatedDate: string;
}

interface UpdateListRequestStatusDto {
    ids: [];
    status: string;
    updatedBy: string;
}

interface CancelRequestDto {
    userId: string;
    approverId: string;
    comment: string;
    updatedBy: string;
}
export {CreateRequestDto, UpdateRequestDto, GetRequestDto, UpdateListRequestStatusDto, CancelRequestDto};
