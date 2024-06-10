import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-column',
  templateUrl: './status-column.component.html',
  styleUrl: './status-column.component.scss'
})
export class StatusColumnComponent {
    @Input()
    letter!: string;
}
