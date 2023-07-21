import {GetRequestTypeDto} from './requestType.dto.js';

interface CreateRequestReasonDto {
    name: string;
    requestTypeId: string;
    createdBy: string;
    updatedBy: string;
}

interface GetRequestReasonDto {
    id?: string;
    name?: string;
    requestTypeId?: string;
    createdDate?: string;
    updatedDate?: string;
}

interface GetListRequestReasonDto {
    id?: string;
    name?: string;
    requestType?: GetRequestTypeDto;
    createdDate?: string;
    updatedDate?: string;
}

interface UpdateRequestReasonDto {
    id: string;
    name: string;
    requestTypeId: string;
    updatedBy: string;
}
export {CreateRequestReasonDto, UpdateRequestReasonDto, GetRequestReasonDto, GetListRequestReasonDto};
