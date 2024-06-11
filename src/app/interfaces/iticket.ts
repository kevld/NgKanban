import { IBoard } from "./iboard";
import { IStatus } from "./iticket-status";

export interface ITicket {
    id: number;
    title: string;
    description: string;
    status: IStatus;
    statusId: number;
    board: IBoard;
    boardId: number;
}