import { ITicket } from "./iticket";

export interface IBoard {
    id: number;
    title: string;
    description: string;
    tickets: ITicket[];
}
