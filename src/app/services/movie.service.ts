import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CINEMA_API_URL } from '../app-injection-tokens';
import { Observable } from 'rxjs';
import { Page } from '../common/table.types';
import { MovieItem } from '../models/movie/movieItem';
import { CountryRef } from '../models/countryRef';
import { Genre } from '../models/genre';
import { MovieFilterParameters } from '../models/movie/movieFilterParameters';
import { MovieDetail } from '../models/movie/movieDetail';
import { DirectorDetail } from '../models/directorDetail';
import { ActorDetail } from '../models/actor/actorDetail';
import { MovieCreate } from '../models/movie/movieCreate';
import { MovieUpdate } from '../models/movie/movieUpdate';
import { ActorCreate } from '../models/actor/actorCreate';
import { ActorUpdate } from '../models/actor/actorUpdate';

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

  getMovies(filterParams: MovieFilterParameters | null): Observable<Page<MovieItem>>{  
    if (filterParams){
      return this.http.post<Page<MovieItem>>(`${this.apiUrl}api/cinema/movies`, filterParams);
    }
    return this.http.post<Page<MovieItem>>(`${this.apiUrl}api/cinema/movies`,{});
  }

  getCounties(): Observable<CountryRef[]>{
    
    return this.http.get<CountryRef[]>(`${this.apiUrl}api/refbook/countries`,{});
  }

  getGenres(): Observable<Genre[]>{
    return this.http.get<Genre[]>(`${this.apiUrl}api/cinema/genres`,{});
  }

  getMovieById(id:number): Observable<MovieDetail>{
    return this.http.get<MovieDetail>(`${this.apiUrl}api/cinema/movie/${id}`);
  }

  createMovie(createMovieForm: MovieCreate){
    return this.http.post<MovieDetail>(`${this.apiUrl}api/cinema/movie`,createMovieForm);
  }

  updateMovie(updateMovieForm: MovieUpdate){
    return this.http.put<MovieDetail>(`${this.apiUrl}api/cinema/movie`,updateMovieForm);
  }

  removeMovie(id: number){
    return this.http.delete(`${this.apiUrl}api/cinema/movie/${id}`);
  }

  updateMovieRating(estimation:number, movieId:number){
    return this.http.post<any>(`${this.apiUrl}api/cinema/movie/${movieId}/rate`,{rate: estimation});
  }

  getUserEstimationByMovieId(movieId:number){
    return this.http.get<number|null>(`${this.apiUrl}api/cinema/rate/${movieId}`,{});
  }

  getDirectorsDetails(){
    return this.http.get<DirectorDetail[]>(`${this.apiUrl}api/cinema/directors`,{});
  }
  
  getActorsDetails(){
    return this.http.get<ActorDetail[]>(`${this.apiUrl}api/cinema/actors`,{});
  }

  getActorById(id:number):Observable<ActorDetail>{
    return this.http.get<ActorDetail>(`${this.apiUrl}api/cinema/actor/${id}`);
  }

  createActor(createActor: ActorCreate){
    return this.http.post<ActorCreate>(`${this.apiUrl}api/cinema/actor`,createActor);
  }

  updateActor(updateActor: ActorUpdate){
    return this.http.put<ActorDetail>(`${this.apiUrl}api/cinema/actor`,updateActor);
  }

  removeActor(id: number){
    return this.http.delete(`${this.apiUrl}api/cinema/actor/${id}`);
  }
 
}
