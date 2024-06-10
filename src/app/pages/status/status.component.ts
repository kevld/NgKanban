import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CreateStatusAction, GetStatusListAction } from '../../actions/status/status-actions.action';
import { StatusState } from '../../states/status/status.state';
import { ITicketStatus } from '../../interfaces/iticket-status';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrl: './status.component.scss'
})
export class StatusComponent implements OnInit {

    newStatusName: string = "";

    @Select(StatusState.statusList)
    status$?: Observable<ITicketStatus[]>;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetStatusListAction());
    }

    createStatus() {
        if (this.newStatusName && this.newStatusName != "")
            this.store.dispatch(new CreateStatusAction(this.newStatusName));
    }

}
