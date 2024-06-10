import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CreateTicketAction, GetTicketsByBoardAction, UpdateTicketStateAction } from "../../actions/ticket/ticket-actions.action";
import { TicketService } from "../../services/ticket/ticket.service";
import { tap } from "rxjs";
import { ITicket } from "../../interfaces/iticket";

export class TicketStateModel {
    tickets: ITicket[]  = [];
}


@State<TicketStateModel>({
    name: 'ticketState',
    defaults: {
        tickets: [],
    }
})
@Injectable()
export class TicketState {

    constructor(private ticketService: TicketService) { }

    @Selector()
    static tickets(state: TicketStateModel) {
        return state.tickets;
    }

    @Action(CreateTicketAction)
    createTicket({}: StateContext<TicketStateModel>, { title, description, statusId, boardId }: CreateTicketAction) {
        return this.ticketService.createTicket(title, description, statusId, boardId).pipe(
            tap(x => {
                console.log(x);
            })
        )
    }

    @Action(GetTicketsByBoardAction)
    getTicketsByBoardId({ patchState }: StateContext<TicketStateModel>, { boardId }: GetTicketsByBoardAction) {
        return this.ticketService.getTicketsByBoardId(boardId).pipe(
            tap(x => {
                patchState({
                    tickets: x
                })
            })
        )
    }

    @Action(UpdateTicketStateAction)
    updateTicketStatus(ctx: StateContext<TicketStateModel>, { boardId, ticketId, newState }:UpdateTicketStateAction) {
        return this.ticketService.updateTicketStatus(boardId, ticketId, newState).pipe(
            tap(x => x)
        );
    }
}