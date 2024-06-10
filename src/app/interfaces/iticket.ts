import { IBoard } from "./iboard";
import { ITicketStatus } from "./iticket-status";

export interface ITicket {
    id: number;
    title: string;
    description: string;
    status: ITicketStatus;
    statusId: number;
    board: IBoard;
    boardId: number;
}