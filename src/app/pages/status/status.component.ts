import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StatusState } from '../../states/status/status.state';
import { IStatus } from '../../interfaces/iticket-status';
import { CreateStatusAction, GetStatusListByBoardAction } from '../../actions/status/status-actions.action';
import { BoardState } from '../../states/board/board-state.state';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrl: './status.component.scss'
})
export class StatusComponent implements OnInit {

    private readonly store: Store = inject(Store);

    newStatusName: string = "";

    status$: Observable<IStatus[]> = this.store.select(StatusState.statusList);

    selectedBoardId$: Observable<number> = this.store.select(BoardState.selectedBoardId);

    selectedBoardId: number = 0;

    ngOnInit(): void {
        this.selectedBoardId$.subscribe(x => {
            this.selectedBoardId = x;
            this.store.dispatch(new GetStatusListByBoardAction(this.selectedBoardId));
        });
    }

    createStatus() {
        if (!this.newStatusName || this.newStatusName == "")
            return;

        this.store.dispatch(new CreateStatusAction(this.selectedBoardId, this.newStatusName));
    }
}
