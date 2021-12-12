import { ACCESS_TOKEN_KEY } from './account.service';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {CINEMA_API_URL} from '../app-injection-token'
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Token } from '../models/token';


export const ACCESS_TOKEN_KEY = 'cinema_access_token';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    @Inject(CINEMA_API_URL) private apiUrl : string,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { } 

  login(username: string, password: string ): Observable<Token>{
    return this.http.post<Token>(`${this.apiUrl}api/account/login`, {
      username, password
    }).pipe(
      tap(token => localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token))
    )
  }

  isAunthenticated():boolean{
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }
}