export class SelectBoardAction {
    static readonly type = '[Boards] SelectBoardAction';
    constructor(public boardId: number) { }
}

export class GetBoardListAction {
    static readonly type = '[Boards] GetBoardListAction';
    constructor() { }
}

export class CreateBoardAction {
    static readonly type = '[Boards] CreateBoardAction';
    constructor(public title: string, public description: string) { }
}

export class GetBoardAction {
    static readonly type = '[Boards] GetBoardAction';
    constructor(public boardId: number) { }
}

export class RegisterColumnAction {
    static readonly type = '[Boards] RegisterColumnAction';
    constructor(public columnName: string) { }
}

export class UnRegisterColumnAction {
    static readonly type = '[Boards] UnRegisterColumnAction';
    constructor(public columnName: string) { }
}
