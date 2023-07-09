import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing1Component } from './routing1/routing1.component';

const routes: Routes = [
  { path: 'route', component: Routing1Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Routing2LearningRoutingModule { }
