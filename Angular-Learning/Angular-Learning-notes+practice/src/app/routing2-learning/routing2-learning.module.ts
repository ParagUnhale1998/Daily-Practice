import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routing2LearningRoutingModule } from './routing2-learning-routing.module';
import { Routing1Component } from './routing1/routing1.component';


@NgModule({
  declarations: [
    Routing1Component
  ],
  imports: [
    CommonModule,
    Routing2LearningRoutingModule
  ]
})
export class Routing2LearningModule { }
