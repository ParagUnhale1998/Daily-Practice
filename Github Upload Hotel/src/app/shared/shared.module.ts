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
// import { CarouselModule } from 'primeng/carousel';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatSidenavModule} from '@angular/material/sidenav';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const materialModules = [
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatInputModule,
  ButtonModule,
  CalendarModule,
  DropdownModule,
  TabViewModule,
  CarouselModule,
  SliderModule,
  RatingModule,
  MatSidenavModule,
  HttpClientModule,
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HighlightDirective,
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ...materialModules  // Spread the array directly here
  ],
  exports: [
    ...materialModules ,
     HeaderComponent,
  FooterComponent, // Spread the array directly here
  ]
})
export class SharedModule { }
