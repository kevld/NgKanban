import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BoardState } from '../../states/board/board-state.state';
import { Observable } from 'rxjs';
import { IBoard } from '../../interfaces/iboard';
import { GetTicketsByBoardAction, UpdateTicketStateAction } from '../../actions/ticket/ticket-actions.action';
import { TicketState } from '../../states/ticket/ticket.state';
import { ITicket } from '../../interfaces/iticket';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
    @Select(BoardState.boards)
    board$?: Observable<IBoard>;

    @Select(BoardState.selectedBoardId)
    selectedBoardId$?: Observable<number>;

    @Select(TicketState.tickets)
    tickets$?: Observable<ITicket[]>;

    @Select(BoardState.registeredColumns)
    connectedColumns$!: Observable<string[]>;

    connectedColumns: string[] = [];

    columns: any[] = [];

    constructor(private store: Store) { }

    ngOnInit(): void {
        this.selectedBoardId$?.subscribe(x => {
            this.store.dispatch(new GetTicketsByBoardAction(x));
        });

        this.tickets$?.subscribe(x => {
            this.columns = [];

            if (!x || !x.length)
                return;
            const columns = [... new Set(x.map(t => t.status.id))];

            columns.forEach(col => {
                this.columns.push({
                    status: x.map(t => t.status).filter(s => s.id == col)[0],
                    tickets: x.filter(t => t.statusId === col)
                });
            });


            this.connectedColumns = columns.map(x => x.toString());

            //this.store.dispatch(new DragDropConnection(this.columns.map(x => x.)));
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
            this.store.dispatch(new UpdateTicketStateAction(boardId, event.container.data[event.currentIndex].id, parseInt(event.container.id)))
          }
    }
}
