import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailComponent } from './components/movie/movie.component';

const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'login', component:LoginPageComponent},
  { path: 'register', component: RegistrationPageComponent},
  { path: 'movie/:id', component: MovieDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
