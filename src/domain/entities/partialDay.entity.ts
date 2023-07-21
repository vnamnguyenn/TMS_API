export class PartialDay {
    private id: number;
    private name: string;
    private createdBy: string;
    private updatedBy: string;
    private createdDate: string;
    private updatedDate: string;

    constructor(id: number, name: string, createdBy: string, updatedBy: string) {
        this.id = id;
        this.name = name;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDate = new Date().toUTCString();
        this.updatedDate = new Date().toUTCString();
    }

    public getId(): number {
        return this.id;
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
