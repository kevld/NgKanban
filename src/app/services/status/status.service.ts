import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITicketStatus } from '../../interfaces/iticket-status';

@Injectable({
    providedIn: 'root'
})
export class StatusService {

    constructor(private http: HttpClient) { }

    createStatus(name: string): Observable<ITicketStatus> {
        return this.http.post<ITicketStatus>('http://localhost:5067/api/Status', {
            'Name': name
        });
    }

    getStatusList(): Observable<ITicketStatus[]> {
        return this.http.get<ITicketStatus[]>('http://localhost:5067/api/Status');
    }
}
