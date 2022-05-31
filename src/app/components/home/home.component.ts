import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { MovieService } from '../../services/movie.service';
import { Page } from '../../common/table.types';
import { MovieItem } from '../../models/movie/movieItem';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CountryRef } from '../../models/countryRef';
import { Genre } from 'src/app/models/genre/genre';
import { MovieFilterParameters } from '../../models/movie/movieFilterParameters';
import { Location } from '@angular/common'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public movies: MovieItem[];
  public total: number;
  public countries: CountryRef[];
  public genresList: Genre[];
  genres = new FormControl();
  filterForm: FormGroup;
  selectedCountry: string;
  movieFilter: MovieFilterParameters = null;

  constructor(private auth: AccountService,
              private movieService: MovieService,
              private location: Location){ }

  ngOnInit(): void {
    this.getAllMovies();
    this.getCountriesRef();
    this.getAllGenres();
    this.filterForm = new FormGroup({
      yearFrom: new FormControl(null),
      yearTo: new FormControl(null),
      countryId: new FormControl(null),
      name: new FormControl(null),
      genres: new FormControl(null)
    });
  }

  public get isLoggedIn(): boolean{
    return this.auth.isAunthenticated();
  }

 getAllMovies(){
    this.movieService.getMovies(this.movieFilter).subscribe(res=>{
      this.movies = res['items'];
      this.total = res['total'];
    });
  }

  getCountriesRef(){
    this.movieService.getCounties().subscribe(res=>{
      this.countries = res;
    });
  }

  getAllGenres(){
    this.movieService.getGenres().subscribe(res=>{
      this.genresList = res;
    });
  }

  applyFilters(){
    this.movieFilter.countryId = this.filterForm.value.countryId ? Number(this.filterForm.value.countryId) : null;
    this.movieFilter.yearFrom = this.filterForm.value.yearFrom ? Number(this.filterForm.value.yearFrom) : null;
    this.movieFilter.yearTo = this.filterForm.value.yearTo ? Number(this.filterForm.value.yearTo) : null;
    this.movieFilter.name = this.filterForm.value.name;
    this.movieFilter.genres = this.filterForm.value.genres;
    
    this.movieService.getMovies(this.movieFilter).subscribe(res=>{
      this.movies = res['items'];
      this.total = res['total'];
    });
  }
}
