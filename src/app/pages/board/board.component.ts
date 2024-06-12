import { Component, OnInit, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BoardState } from '../../states/board/board-state.state';
import { Observable } from 'rxjs';
import { IBoard } from '../../interfaces/iboard';
import { GetTicketsByBoardAction, UpdateTicketStateAction } from '../../actions/ticket/ticket-actions.action';
import { TicketState } from '../../states/ticket/ticket.state';
import { ITicket } from '../../interfaces/iticket';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GetStatusListByBoardAction } from '../../actions/status/status-actions.action';
import { StatusState } from '../../states/status/status.state';
import { IStatus } from '../../interfaces/iticket-status';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {

    private readonly store: Store = inject(Store);

    board$?: Observable<IBoard>;

    selectedBoardId$: Observable<number> = this.store.select(BoardState.selectedBoardId);

    tickets$: Observable<ITicket[]> = this.store.select(TicketState.tickets);

    connectedColumns$: Observable<string[]> = this.store.select(BoardState.registeredColumns);

    connectedColumns: string[] = [];

    columns: any[] = [];

    ngOnInit(): void {
        this.selectedBoardId$?.subscribe(x => {
            this.store.dispatch(new GetTicketsByBoardAction(x));
            this.store.dispatch(new GetStatusListByBoardAction(x))
        });

        this.tickets$?.subscribe(x => {
            this.columns = [];

            

            const columns: IStatus[] = this.store.selectSnapshot<IStatus[]>(StatusState.statusList);
            console.log(columns)
            columns.forEach((col: IStatus) => {
                this.columns.push({
                    status: col.id,
                    statusName: col.name,
                    tickets: x.filter(t => t.statusId === col.id)
                });
            });

            this.connectedColumns = columns.map(x => x.id.toString());
        });
    }

    public getStyles() {
        return {
            display: 'grid',
            'grid-template-columns': `repeat(${this.columns.length}, 1fr)`,
            'justify-items': 'stretch',
        };
    }

    onDrop(event: CdkDragDrop<any, any, any>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
          } else {
            transferArrayItem(
              event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex,
            );

            const boardId = this.store.selectSnapshot<number>(BoardState.selectedBoardId);
            this.store.dispatch(new UpdateTicketStateAction(event.container.data[event.currentIndex].id, parseInt(event.container.id)))
          }
    }
}
