import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IStatus } from "../../interfaces/iticket-status";
import { Injectable } from "@angular/core";
import { CreateStatusAction, GetStatusListByBoardAction } from "../../actions/status/status-actions.action";
import { StatusService } from "../../services/status/status.service";
import { Observable, tap } from "rxjs";

export class StatusStateModel {
    status: IStatus[] = [];
}


@State<StatusStateModel>({
    name: 'statusState',
    defaults: {
        status: [],
    }
})
@Injectable()
export class StatusState {

    constructor(private statusService: StatusService) { }

    @Selector()
    static statusList(state: StatusStateModel) {
        return state.status;
    }

    @Action(CreateStatusAction)
    createStatus({ getState, patchState }: StateContext<StatusStateModel>, { boardId, name }: CreateStatusAction): Observable<IStatus> {
        return this.statusService.createStatus(boardId, name).pipe(
            tap(x => {
                const statusList = getState().status;
                patchState({
                    status: [...statusList, x]
                });
            })
        );
    }

    @Action(GetStatusListByBoardAction)
    getStatusList({ patchState }: StateContext<StatusStateModel>, { boardId }: GetStatusListByBoardAction): Observable<IStatus[]> {
        return this.statusService.getStatusByBoardId(boardId).pipe(
            tap(x => {
                patchState({
                    status: x
                });
            })
        );
    }
}