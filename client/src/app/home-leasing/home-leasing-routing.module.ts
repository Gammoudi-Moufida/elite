import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLeasingComponent } from './home-leasing.component';

const routes: Routes = [
  { path: '',  component: HomeLeasingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeLeasingRoutingModule { }
