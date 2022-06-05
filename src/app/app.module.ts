import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VimeModule } from '@vime/angular';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { environment } from '../environments/environment';
import { CINEMA_API_URL } from './app-injection-tokens'
import { JwtModule } from '@auth0/angular-jwt'
import { ACCESS_TOKEN_KEY } from './services/account.service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailComponent } from './components/movie/movie.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuard } from './guards/authGuard';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { AdminMovieModalDialogComponent } from './components/admin-movie-modal-dialog/admin-movie-modal-dialog.component';
import { AuthRoleGuard } from './guards/authRoleGuard';
import { ConfirmationDeleteDialogComponent } from './components/confirmation-delete-dialog/confirmation-delete-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdministrationActorComponent } from './components/administration-actor/administration-actor.component';
import { AdminActorModalDialogComponent } from './components/admin-actor-modal-dialog/admin-actor-modal-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdministrationDirectorComponent } from './components/administration-director/administration-director.component';
import { AdminDirectorModalDialogComponent } from './components/admin-director-modal-dialog/admin-director-modal-dialog.component';
import { AdministrationGenreComponent } from './components/administration-genre/administration-genre.component';
import { AdminGenreModalDialogComponent } from './components/admin-genre-modal-dialog/admin-genre-modal-dialog.component';
import { AdministrationUserComponent } from './components/administration-user/administration-user.component';
import { AdminUserModalDialogComponent } from './components/admin-user-modal-dialog/admin-user-modal-dialog.component';
import { HomeCartoonComponent } from './components/home-cartoon/home-cartoon.component';
import { AdministrationCartoonComponent } from './components/administration-cartoon/administration-cartoon.component';
import { AuthInterceptor } from './auth-interceptor';




export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    HomeComponent,
    MovieDetailComponent,
    ModalDialogComponent,
    ScrollTopComponent,
    AdministrationComponent,
    AdminMovieModalDialogComponent,
    ConfirmationDeleteDialogComponent,
    AdministrationComponent,
    AdministrationActorComponent,
    AdminActorModalDialogComponent,
    AdministrationDirectorComponent,
    AdminDirectorModalDialogComponent,
    AdministrationGenreComponent,
    AdminGenreModalDialogComponent,
    AdministrationUserComponent,
    AdminUserModalDialogComponent,
    HomeCartoonComponent,
    AdministrationCartoonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VimeModule,
    BrowserAnimationsModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.allowedDomains
      }
    })
  ],
  providers: [
    { provide: CINEMA_API_URL, useValue: environment.cinemaApi },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    AuthRoleGuard,
    MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
