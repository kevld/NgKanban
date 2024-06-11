import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BoardState } from '../../states/board/board-state.state';
import { Observable } from 'rxjs';
import { IBoard } from '../../interfaces/iboard';
import { Select, Store } from '@ngxs/store';
import { IStatus } from '../../interfaces/iticket-status';
import { ITicket } from '../../interfaces/iticket';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { RegisterColumnAction, UnRegisterColumnAction } from '../../actions/board/board-actions.action';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrl: './board-column.component.scss'
})
export class BoardColumnComponent implements OnInit, OnDestroy {
    
    @Input()
    columnData!: IStatus;

    @Input()
    tickets?: ITicket[];

    id: string = "";

    @Select(BoardState.registeredColumns)
    connectedColumns$!: Observable<string[]>;

    connectedColumns: string[] = [];

    constructor(private store: Store) { }
    
    
    ngOnInit(): void {
        this.id = "boardcol" + this.columnData.id;

        this.register();

        this.connectedColumns$.subscribe(x => {
            if(x && x.length) {
                this.connectedColumns = x
            }
        })
    }

    ngOnDestroy(): void {
        this.unregister();
    }

    onDrop(event: CdkDragDrop<string[]>) {
        console.log(event);
    }

    register(): void {
        if(!this.id || !this.id.length)
            return;

        this.store.dispatch(new RegisterColumnAction(this.id));
    }

    unregister(): void {
        this.store.dispatch(new UnRegisterColumnAction(this.id));
    }
}
