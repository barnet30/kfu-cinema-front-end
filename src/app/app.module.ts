import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { VimeModule } from '@vime/angular';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { environment } from '../environments/environment';
import {CINEMA_API_URL} from './app-injection-tokens'
import {JwtModule} from '@auth0/angular-jwt'
import { ACCESS_TOKEN_KEY } from './services/account.service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailComponent } from './components/movie/movie.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthGuard } from './guards/authGuard';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { AdministrationComponent } from './components/administration/administration.component';



export function tokenGetter(){
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
    AdministrationComponent
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
    NgMultiSelectDropDownModule.forRoot(),
    
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains : environment.allowedDomains
      }
    })
  ],
  providers: [{
    provide: CINEMA_API_URL,
    useValue: environment.cinemaApi
  },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
