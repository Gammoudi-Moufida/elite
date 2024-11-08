import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCarburantComponent } from './new-carburant.component';

const routes: Routes = [
  { path: '',  component: NewCarburantComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCarburantRoutingModule { }
