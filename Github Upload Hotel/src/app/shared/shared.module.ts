import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HighlightDirective } from './directives/highlight.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Add this line
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
const materialModules = [
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  ButtonModule,
  CalendarModule,
  DropdownModule,
  TabViewModule
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    ...materialModules  // Spread the array directly here
  ],
  exports: [
    ...materialModules  // Spread the array directly here
  ]
})
export class SharedModule { }
