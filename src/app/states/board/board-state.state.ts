import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IBoard } from "../../interfaces/iboard";
import { Injectable } from "@angular/core";
import { BoardService } from "../../services/board/board.service";
import { CreateBoardAction, GetBoardListAction, RegisterColumnAction, SelectBoardAction, UnRegisterColumnAction } from "../../actions/board/board-actions.action";
import { Observable, tap } from "rxjs";

export class BoardStateModel {
    boards: IBoard[] = [];
    newBoardName: string = "";
    selectedBoardId: number = 0;
    board?: IBoard | null;
    registeredColumns: string[] = [];
}

@State<BoardStateModel>({
    name: 'boardState',
    defaults: {
        boards: [],
        newBoardName: "",
        selectedBoardId: 0,
        board: null,
        registeredColumns: []
    }
})
@Injectable()
export class BoardState {
    constructor(private boardService: BoardService) { }

    @Selector()
    static boards(state: BoardStateModel) {
        return state.boards;
    }

    @Selector()
    static selectedBoardId(state: BoardStateModel) {
        return state.selectedBoardId;
    }

    @Selector()
    static registeredColumns(state: BoardStateModel) {
        return state.registeredColumns;
    }

    @Action(CreateBoardAction)
    createBoard({ getState, patchState }: StateContext<BoardStateModel>, { title, description }: CreateBoardAction): any {
        return this.boardService.createBoard(title, description).pipe(
            tap(x => {
                const boards = getState().boards;
                patchState({
                    boards: [...boards, x]
                });
            })
        );
    }

    @Action(GetBoardListAction)
    getBoardList({ patchState }: StateContext<BoardStateModel>): any {
        return this.boardService.getBoards().pipe(
            tap(x => {
                patchState({
                    boards: x
                });
            })
        );
    }

    @Action(SelectBoardAction)
    getBoard({ patchState }: StateContext<BoardStateModel>, { boardId }: SelectBoardAction): any {
        return this.boardService.getBoardById(boardId).pipe(
            tap((x: IBoard) => {
                patchState({
                    board: x,
                    selectedBoardId: x.id
                });
            })
        );
    }

    @Action(RegisterColumnAction)
    registerColumn({ getState, patchState }: StateContext<BoardStateModel>, { columnName }: RegisterColumnAction): void {

        const registeredColumns = getState().registeredColumns;

        if (registeredColumns.filter(x => x == columnName).length)
            return;

        patchState({
            registeredColumns: [...registeredColumns, columnName]
        });
    }

    @Action(UnRegisterColumnAction)
    unregisterColumn({ getState, patchState }: StateContext<BoardStateModel>, { columnName }: UnRegisterColumnAction): void {
        let registeredColumns = getState().registeredColumns;
        registeredColumns = registeredColumns.filter(x => x != columnName);

        patchState({
            registeredColumns: registeredColumns
        })
    }

}

