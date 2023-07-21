export class Request {
    private id: string;
    private userId: string;
    private requestTypeId: string;
    private requestReasonId: string;
    private partialDayId: number;
    private statusId: string | null;
    private supervisor: string | null;
    private approver: string | null;
    private informTo: string | null;
    private comment: string | null;
    private detailReason: null | string;
    private expectedDate: string | null;
    private startDate: string;
    private endDate: string;
    private createdBy: string | null;
    private updatedBy: string;
    private createdDate: string;
    private updatedDate: string;

    constructor(
        id: string,
        userId: string,
        requestTypeId: string,
        requestReasonId: string,
        partialDayId: number,
        statusId: string | null,
        supervisor: string | null,
        approver: string | null,
        informTo: string | null,
        comment: string | null,
        detailReason: null | string,
        expectedDate: string | null,
        startDate: string,
        endDate: string,
        createdBy: string | null,
        updatedBy: string,
    ) {
        this.id = id;
        this.userId = userId;
        this.requestTypeId = requestTypeId;
        this.requestReasonId = requestReasonId;
        this.partialDayId = partialDayId;
        this.statusId = statusId;
        this.supervisor = supervisor;
        this.approver = approver;
        this.informTo = informTo == '' ? null : informTo;
        this.comment = comment;
        this.detailReason = detailReason == '' ? null : detailReason;
        this.startDate = startDate;
        this.endDate = endDate;
        this.expectedDate = expectedDate;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDate = new Date().toUTCString();
        this.updatedDate = new Date().toUTCString();
    }
    getId(): string {
        return this.id;
    }

    setId(id: string): void {
        this.id = id;
    }

    getUserId(): string {
        return this.userId;
    }

    setUserId(userId: string): void {
        this.userId = userId;
    }

    getRequestTypeId(): string {
        return this.requestTypeId;
    }

    setRequestTypeId(requestTypeId: string): void {
        this.requestTypeId = requestTypeId;
    }

    getRequestReasonId(): string {
        return this.requestReasonId;
    }

    setRequestReasonId(requestReasonId: string): void {
        this.requestReasonId = requestReasonId;
    }

    getPartialDayId(): number {
        return this.partialDayId;
    }

    setPartialDayId(partialDayId: number): void {
        this.partialDayId = partialDayId;
    }

    getStatusId(): string | null {
        return this.statusId;
    }

    setStatusId(statusId: string): void {
        this.statusId = statusId;
    }

    getSupervisor(): string | null {
        return this.supervisor;
    }

    setSupervisor(supervisor: string): void {
        this.supervisor = supervisor;
    }

    getApprover(): string | null {
        return this.approver;
    }

    setApprover(approver: string): void {
        this.approver = approver;
    }

    getInformTo(): string | null {
        return this.informTo;
    }

    setInformTo(informTo: string): void {
        this.informTo = informTo;
    }

    getComment(): string | null {
        return this.comment;
    }

    setComment(comment: string | null): void {
        this.comment = comment;
    }

    getDetailReason(): null | string {
        return this.detailReason;
    }

    setDetailReason(detailReason: string): void {
        this.detailReason = detailReason;
    }

    getExpectedDate(): string | null {
        return this.expectedDate;
    }

    setExpectedDate(expectedDate: string): void {
        this.expectedDate = expectedDate;
    }

    getStartDate(): string {
        return this.startDate;
    }

    setStartDate(startDate: string): void {
        this.startDate = startDate;
    }

    getEndDate(): string {
        return this.endDate;
    }

    setEndDate(endDate: string): void {
        this.endDate = endDate;
    }

    getCreatedBy(): string | null {
        return this.createdBy;
    }

    setCreatedBy(createdBy: string): void {
        this.createdBy = createdBy;
    }

    getUpdatedBy(): string {
        return this.updatedBy;
    }

    setUpdatedBy(updatedBy: string): void {
        this.updatedBy = updatedBy;
    }

    getCreatedDate(): string {
        return this.createdDate;
    }

    getUpdatedDate(): string {
        return this.updatedDate;
    }
}
