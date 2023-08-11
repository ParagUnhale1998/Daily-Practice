import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },  
  {path:'user',loadChildren : () => import('./user/user.module').then(m => m.UserModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
