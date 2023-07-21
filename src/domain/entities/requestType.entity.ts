export class RequestType {
    private id: string;
    private name: string;
    private description: string;
    private createdBy: string;
    private updatedBy: string;
    private createdDate: string;
    private updatedDate: string;

    constructor(id: string, name: string, description: string, createdBy: string, updatedBy: string) {
        this.id = id;
        this.name = name;
        this.description = description ?? null;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDate = new Date().toUTCString();
        this.updatedDate = new Date().toUTCString();
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
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

    public updateName(name: string) {
        this.name = name;
    }

    public updateDescription(description: string) {
        this.description = description;
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
