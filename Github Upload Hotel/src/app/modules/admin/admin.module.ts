import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    ManageUsersComponent,
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,SharedModule
  ]
})
export class AdminModule { }
