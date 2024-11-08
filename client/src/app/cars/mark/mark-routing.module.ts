import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MarkComponent} from "./mark.component";

const routes: Routes = [
  { path: '',  component: MarkComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class MarkRoutingModule { }