import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ITicketStatus } from "../../interfaces/iticket-status";
import { Injectable } from "@angular/core";
import { CreateStatusAction, GetStatusListAction } from "../../actions/status/status-actions.action";
import { StatusService } from "../../services/status/status.service";
import { Observable, tap } from "rxjs";

export class StatusStateModel {
    status: ITicketStatus[] = [];
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
    createStatus({ getState, patchState }: StateContext<StatusStateModel>, { name }: CreateStatusAction): Observable<ITicketStatus> {
        return this.statusService.createStatus(name).pipe(
            tap(x => {
                const statusList = getState().status;
                patchState({
                    status: [...statusList, x]
                });
            })
        );
    }

    @Action(GetStatusListAction)
    getStatusList({ patchState }: StateContext<StatusStateModel>): Observable<ITicketStatus[]> {
        return this.statusService.getStatusList().pipe(
            tap(x => {
                patchState({
                    status: x
                });
            })
        );
    }
}