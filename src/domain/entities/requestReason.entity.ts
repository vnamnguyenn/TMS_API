export class RequestReason {
    private id: string;
    private name: string;
    private requestTypeId: string;
    private createdBy: string;
    private updatedBy: string;
    private createdDate: string;
    private updatedDate: string;

    constructor(id: string, name: string, requestTypeId: string, createdBy: string, updatedBy: string) {
        this.id = id;
        this.requestTypeId = requestTypeId;
        this.name = name;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDate = new Date().toUTCString();
        this.updatedDate = new Date().toUTCString();
    }

    public getId(): string {
        return this.id;
    }

    public getRequestTypeId(): string {
        return this.requestTypeId;
    }

    public getName(): string {
        return this.name;
    }

    public getCreatedBy(): string {
        return this.createdBy;
    }

    public getUpdatedBy(): string {
        return this.updatedBy;
    }

    public getCreatedDate(): string {
        return this.createdDate;
    }

    public getUpdatedDate(): string {
        return this.updatedDate;
    }

    public updateRequestTypeId(requestTypeId: string) {
        this.requestTypeId = requestTypeId;
    }

    public updateName(name: string) {
        this.name = name;
    }

    public updateUpdatedBy(updatedBy: string) {
        this.updatedBy = updatedBy;
    }

    public updateUpdatedDate(updatedDate: string) {
        this.updatedDate = updatedDate;
    }

    public updateCreatedDate(createdDate: string) {
        this.createdDate = createdDate;
    }
}
