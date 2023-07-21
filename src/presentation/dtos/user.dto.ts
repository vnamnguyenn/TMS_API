interface CreateUserDto {
    userId: string;
    picture:string;
    email: string;
    name: string;
}

interface GetUserDto {
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
    createdDate?: string;
    updatedDate?: string;
}

export {GetUserDto, CreateUserDto};
