export class CreateStatusAction {
    static readonly type = '[Status] CreateStatusAction';
    constructor(public boardId: number, public name: string) { }
}

export class GetStatusListByBoardAction {
    static readonly type = '[Status] GetStatusListAction';
    constructor(public boardId: number) { }
}

