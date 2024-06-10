import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CreateTicketAction } from '../../actions/ticket/ticket-actions.action';
import { StatusState } from '../../states/status/status.state';
import { Observable } from 'rxjs';
import { ITicketStatus } from '../../interfaces/iticket-status';
import { GetStatusListAction } from '../../actions/status/status-actions.action';
import { BoardState } from '../../states/board/board-state.state';

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
    status$?: Observable<ITicketStatus[]>;

    @Select(BoardState.selectedBoardId)
    boardId$?: Observable<number>;

    constructor(private store: Store) {

    }
    ngOnInit(): void {
        this.store.dispatch(new GetStatusListAction());

        this.boardId$?.subscribe(x => {
            this.boardId = x;
        });
    }

    createTicket(): void {
        if (this.title && this.title != "") {
            this.store.dispatch(new CreateTicketAction(this.title, this.description, this.statusId, this.boardId));
        }
    }

    onChange($event: any) {
        this.statusId = $event.target.value;
    }
}
