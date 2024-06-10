import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CreateBoardAction, GetBoardListAction, SelectBoardAction } from '../../actions/board/board-actions.action';
import { Observable } from 'rxjs';
import { BoardState } from '../../states/board/board-state.state';
import { IBoard } from '../../interfaces/iboard';

@Component({
  selector: 'app-board-selector',
  templateUrl: './board-selector.component.html',
  styleUrl: './board-selector.component.scss'
})
export class BoardSelectorComponent implements OnInit {

    title: string = "";
    description: string = "";

    @Select(BoardState.boards)
    boards$?: Observable<IBoard[]>;
    
    constructor(private store: Store) { }

    ngOnInit(): void {
        this.store.dispatch(new GetBoardListAction());
    }

    onChange(ev: any): void {
        this.store.dispatch(new SelectBoardAction(parseInt(ev.target.value)));
    }

    createBoard(): void {
        if(this.title && this.title != "")
            this.store.dispatch(new CreateBoardAction(this.title, this.description));
    }
}
