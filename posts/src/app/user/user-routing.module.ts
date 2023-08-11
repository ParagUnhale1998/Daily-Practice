import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  
  {path:'',component:AllPostsComponent},
  // {path:'home',component:HomeComponent},
  // {path:'login',component:LoginComponent},
  // {path:'signUp',component:SignUpComponent},
  {path:'addPost',component:AddPostComponent},
  { path: 'allposts', component: AllPostsComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
