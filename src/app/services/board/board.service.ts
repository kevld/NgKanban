import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../../interfaces/iboard';

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    getBoardById(boardId: number): Observable<IBoard> {
        return this.http.get<IBoard>("http://localhost:5067/api/Board/" + boardId);
    }
    
    createBoard(title: string, description: string): Observable<IBoard> {
        return this.http.post<IBoard>('http://localhost:5067/api/Board', {
            'title': title,
            'description': description
        });
    }

    constructor(private http: HttpClient) { }

    getBoards(): Observable<IBoard[]> {
        return this.http.get<IBoard[]>('http://localhost:5067/api/Board');
    }
}
