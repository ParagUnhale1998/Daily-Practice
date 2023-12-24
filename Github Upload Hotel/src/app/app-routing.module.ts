import { NgModule } from '@angular/core';
import { RouterModule, Routes ,PreloadAllModules} from '@angular/router';
import { HomeComponent } from './modules/user/components/home/home.component';
import { AllhotelsComponent } from './modules/user/components/allhotels/allhotels.component';
import { LoginComponent } from './modules/user/components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' }, // Redirect empty path to /user
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: 'owner', loadChildren: () => import('./modules/hotel-owner/hotel-owner.module').then(m => m.HotelOwnerModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
