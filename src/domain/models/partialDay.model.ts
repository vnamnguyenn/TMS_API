export interface IPartialDay {
    id: number;
    name: string;
    createdDate?: string;
    updatedDate?: string;
}

export interface IPartialDayList extends IPartialDay {
    totalRecords: number;
}
