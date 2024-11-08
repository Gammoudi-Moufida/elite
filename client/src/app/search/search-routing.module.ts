import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlgoliaSearchComponent } from './algolia-search.component';

const routes: Routes = [
  { path: '',  component: AlgoliaSearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
