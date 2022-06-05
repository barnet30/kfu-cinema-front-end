import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailComponent } from './components/movie/movie.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { AuthGuard } from './guards/authGuard';
import { AuthRoleGuard } from './guards/authRoleGuard';
import { HomeCartoonComponent } from './components/home-cartoon/home-cartoon.component';

const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'movies', component:HomeComponent},
  { path: 'cartoons', component:HomeCartoonComponent},
  { path: 'login', component:LoginPageComponent},
  { path: 'register', component: RegistrationPageComponent},
  { path: 'movie/:id', component: MovieDetailComponent},
  { path: 'cartoon/:id', component: MovieDetailComponent},
  { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuard, AuthRoleGuard]},
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
