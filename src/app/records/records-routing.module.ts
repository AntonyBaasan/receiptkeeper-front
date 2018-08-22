import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordsShellComponent } from './container/records-shell/records-shell.component';

const routes: Routes = [{
  path: 'records',
  component: RecordsShellComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
