import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITicket } from '../../interfaces/iticket';

@Injectable({
    providedIn: 'root'
})
export class TicketService {

    constructor(private http: HttpClient) { }

    createTicket(title: string, description: string, statusId: number, boardId: number): Observable<ITicket> {
        return this.http.post<ITicket>('http://localhost:5067/api/Ticket', {
            'Title': title,
            'Description': description,
            'StatusId': statusId,
            'BoardId': boardId
        });
    }

    getTicketsByBoardId(boardId: number): Observable<ITicket[]> {
        return this.http.get<ITicket[]>('http://localhost:5067/api/Ticket/board/' + boardId);
    }

    updateTicketStatus(ticketId: number, newState: number): Observable<any> {
        return this.http.put<any>('http://localhost:5067/api/Ticket/status', {
                'TicketId': ticketId,
                'StatusId': newState
        })
    }
}
