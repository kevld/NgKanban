import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './pages/board/board.component';
import { StatusColumnComponent } from './components/status-column/status-column.component';
import { FormsModule } from '@angular/forms';
import { BoardSelectorComponent } from './components/board-selector/board-selector.component';
import { NgxsModule } from '@ngxs/store';
import { BoardState } from './states/board/board-state.state';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BoardColumnComponent } from './components/board-column/board-column.component';
import { StatusComponent } from './pages/status/status.component';
import { StatusState } from './states/status/status.state';
import { TicketCreatorComponent } from './components/ticket-creator/ticket-creator.component';
import { TicketState } from './states/ticket/ticket.state';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AppComponent,
        BoardComponent,
        StatusColumnComponent,
        BoardSelectorComponent,
        BoardColumnComponent,
        StatusComponent,
        TicketCreatorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        DragDropModule,
        NgxsModule.forRoot([
            BoardState,
            StatusState,
            TicketState
          ]),
    ],
    providers: [provideHttpClient(withFetch())],
    bootstrap: [AppComponent]
})
export class AppModule { }
