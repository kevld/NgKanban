import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { StatusComponent } from './pages/status/status.component';

const routes: Routes = [
    { path: '', component: BoardComponent },
    { path: 'board', component: BoardComponent },
    { path: 'status', component: StatusComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
