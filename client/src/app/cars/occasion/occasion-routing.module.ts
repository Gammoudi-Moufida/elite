import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OccasionComponent} from "./occasion.component";

const routes: Routes = [
  { path: '',  component: OccasionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccasionRoutingModule { }