import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CreateTicketAction, GetTicketsByBoardAction } from '../../actions/ticket/ticket-actions.action';
import { StatusState } from '../../states/status/status.state';
import { Observable, tap } from 'rxjs';
import { IStatus } from '../../interfaces/iticket-status';
import { BoardState } from '../../states/board/board-state.state';
import { GetStatusListByBoardAction } from '../../actions/status/status-actions.action';

@Component({
    selector: 'app-ticket-creator',
    templateUrl: './ticket-creator.component.html',
    styleUrl: './ticket-creator.component.scss'
})
export class TicketCreatorComponent implements OnInit {


    title: string = "";
    description: string = "";
    statusId: number = 0;
    boardId: number = 0;

    @Select(StatusState.statusList)
    status$?: Observable<IStatus[]>;

    @Select(BoardState.selectedBoardId)
    boardId$?: Observable<number>;

    constructor(private store: Store) {

    }
    ngOnInit(): void {

        this.boardId$?.subscribe(x => {
            this.boardId = x;
            this.store.dispatch(new GetStatusListByBoardAction(this.boardId));
        });
    }

    createTicket(): void {
        if (this.title && this.title != "") {
            this.store.dispatch(new CreateTicketAction(this.title, this.description, this.statusId, this.boardId)).subscribe(
                () => {
                    this.store.dispatch(new GetTicketsByBoardAction(this.boardId));
                }
            );
        }
    }

    onChange($event: any) {
        this.statusId = $event.target.value;
    }
}
