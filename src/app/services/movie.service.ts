import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CINEMA_API_URL } from '../app-injection-tokens';
import { Observable } from 'rxjs';
import { Page } from '../common/table.types';
import { MovieItem } from '../models/movieItem';
import { CountryRef } from '../models/countryRef';
import { Genre } from '../models/genre';

export const ACCESS_TOKEN_KEY = 'cinema_access_token';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient,
    @Inject(CINEMA_API_URL) private apiUrl : string,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  getMovies(): Observable<Page<MovieItem>>{
    return this.http.post<Page<MovieItem>>(`${this.apiUrl}api/cinema/movies`,{});
  }

  getCounties(): Observable<CountryRef[]>{
    return this.http.get<CountryRef[]>(`${this.apiUrl}api/refbook/countries`,{});
  }

  getGenres(): Observable<Genre[]>{
    return this.http.get<Genre[]>(`${this.apiUrl}api/cinema/genres`,{});
  }
}
