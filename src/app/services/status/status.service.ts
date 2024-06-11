import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStatus } from '../../interfaces/iticket-status';

@Injectable({
    providedIn: 'root'
})
export class StatusService {

    constructor(private http: HttpClient) { }

    createStatus(boardId: number, statusName: string): Observable<IStatus> {
        return this.http.post<IStatus>('http://localhost:5067/api/Status', {
            'Name': statusName,
            'BoardId': boardId
        });
    }

    getStatusByBoardId(boardId: number): Observable<IStatus[]> {
        return this.http.get<IStatus[]>('http://localhost:5067/api/Status/Board/' + boardId);
    }
}
