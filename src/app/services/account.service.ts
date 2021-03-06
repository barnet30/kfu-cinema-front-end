import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {CINEMA_API_URL} from '../app-injection-tokens'
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Token } from '../models/token';
import { Location } from '@angular/common'
import { Account } from '../models/account/Account';
import { Role } from '../common/role';


export const ACCESS_TOKEN_KEY = 'cinema_access_token';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private token = null;

  constructor(
    private http: HttpClient,
    @Inject(CINEMA_API_URL) private apiUrl : string,
    private jwtHelper: JwtHelperService
  ) { } 

  login(username: string, password: string ): Observable<Token>{
    return this.http.post<Token>(`${this.apiUrl}api/account/login`, {
      username, password
    }).pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.token)
        this.setToken(token.token);
      })
    )
  }

  register(username: string, password: string, email: string) : Observable<Token>{
    return this.http.post<Token>(`${this.apiUrl}api/account/register`, {
      username, password, email
    }).pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.token)
        this.setToken(token.token);
      })
    )
  }

  isAunthenticated():boolean{
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.token = null;
    location.reload();
  }

  setToken(token: string){
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  getTokenFromLocalStorage(): string{
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getUsername(): string {
    let jwt = this.jwtHelper.decodeToken(localStorage.getItem(ACCESS_TOKEN_KEY));
    return jwt['username'];
  }

  isAdmin(): boolean {
    let jwt = this.jwtHelper.decodeToken(localStorage.getItem(ACCESS_TOKEN_KEY));
    let roles = jwt['role'];  
    return roles.includes('Admin');
  }


  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}api/account/accounts`);
  } 

  getAccountById(id: number): Observable<Account>{
    return this.http.get<Account>(`${this.apiUrl}api/account/${id}`);
  }

  removeAccountById(id: number){
    return this.http.delete(`${this.apiUrl}api/account/${id}`);
  }

  updateRoles(id:number, roles: Role[]){
    return this.http.patch(`${this.apiUrl}api/account/${id}/roles`, roles);
  }
}
