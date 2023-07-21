export class User {
    private id: string;
    private picture: string;
    private name: string;
    private email: string;
    private createdBy: string;
    private updatedBy: string;
    private createdDate: string;
    private updatedDate: string;

    constructor(id: string, name: string, picture: string, email: string, createdBy: string, updatedBy: string) {
        this.id = id;
        this.picture = picture;
        this.email = email;
        this.name = name;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDate = new Date().toUTCString();
        this.updatedDate = new Date().toUTCString();
    }

    public getEmail(): string {
        return this.email;
    }

    public getId(): string {
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

    public getPicture(): string {
        return this.picture;
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
