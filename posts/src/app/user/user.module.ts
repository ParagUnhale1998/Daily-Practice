import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FilterPipe } from '../shared/filter.pipe';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    // UserComponent,
    UserComponent,
    SignUpComponent,
    LoginComponent,
    PostsComponent,
    AddPostComponent,
    AllPostsComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FilterPipe,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class UserModule { }
