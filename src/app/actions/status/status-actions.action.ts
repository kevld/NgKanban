export class CreateStatusAction {
    static readonly type = '[Status] CreateStatusAction';
    constructor(public name: string) { }
}

export class GetStatusListAction {
    static readonly type = '[Status] GetStatusListAction';
    constructor() { }
}
