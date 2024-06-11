import { ITicket } from "./iticket";
import { IStatus } from "./iticket-status";

export interface IBoard {
    id: number;
    title: string;
    description: string;
    tickets: ITicket[];
    statuses: IStatus[];
}
