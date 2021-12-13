import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MoviesComponent } from './components/movies/movies.component';
import { environment } from '../environments/environment';
import {CINEMA_API_URL} from './app-injection-token'
import {JwtModule} from '@auth0/angular-jwt'
import { ACCESS_TOKEN_KEY } from './services/account.service';
import { TokenInterceptor } from './shared/token.interceptor';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    
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
  },{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
