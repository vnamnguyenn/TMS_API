interface CreatePartialDayDto {
    id: number;
    name: string;
    createdBy: string;
    updatedBy: string;
}

interface GetPartialDayDto {
    id: number;
    name: string;
    createdDate?: string;
    updatedDate?: string;
}

interface UpdatePartialDayDto {
    id: number;
    name: string;
    updatedBy: string;
}
export {CreatePartialDayDto, UpdatePartialDayDto, GetPartialDayDto};
