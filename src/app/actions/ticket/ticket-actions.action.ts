export class CreateTicketAction {
    static readonly type = '[Status] CreateTicketAction';
    constructor(public title: string, public description: string, public statusId: number, public boardId: number) { }
}

export class GetTicketsByBoardAction {
    static readonly type = '[Status] GetTicketsByBoardAction';
    constructor(public boardId: number) { }
}

export class UpdateTicketStateAction {
    static readonly type = '[Status] UpdateTicketStateAction';
    constructor(public boardId: number, public ticketId: number, public newState: number) { }
}