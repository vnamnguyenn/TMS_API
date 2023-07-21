export interface IUser {
    id?: string;
    name?: string;
    userName?: string;
    email?: string;
    departmentId?: string;
    specificationId?: string;
    supervisor?: string;
    address?: string;
    birthday?: string;
    phoneNumber?: string;
    userCode?: string;
    createdBy?: string;
    updatedBy?: string;
    createdDate?: string;
    updatedDate?: string;
}

export interface IUserList extends IUser {
    totalRecords: number;
}
