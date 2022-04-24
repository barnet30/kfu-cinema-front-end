import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { MovieService } from '../../services/movie.service';
import { Page } from '../../common/table.types';
import { MovieItem } from '../../models/movieItem';
import { FormControl, FormGroup } from '@angular/forms';
import { CountryRef } from '../../models/countryRef';
import { Genre } from 'src/app/models/genre';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public movies: Page<MovieItem>
  public countries: CountryRef[]
  public genres: Genre[]
  genresDropdownSettings = {};
  selectedGenres = [];
  form: FormGroup
  selectedCountry: string

  constructor(private auth: AccountService,
              private movieService: MovieService){ }

  ngOnInit(): void {
    this.getAllMovies();
    this.getCountriesRef();
    this.getAllGenres();
    this.form = new FormGroup({
      yearFrom: new FormControl(null),
      yearTo: new FormControl(null),
      dateTo: new FormControl(null),
      name: new FormControl(null),
      genres: new FormControl(null)
    });

    this.genresDropdownSettings= {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  public get isLoggedIn(): boolean{
    return this.auth.isAunthenticated();
  }

  getAllMovies(){
    this.movieService.getMovies().subscribe(res=>{
      this.movies = res;
    });
  }

  getCountriesRef(){
    this.movieService.getCounties().subscribe(res=>{
      this.countries = res;
    });
  }

  getAllGenres(){
    this.movieService.getGenres().subscribe(res=>{
      this.genres=res;
    });
  }
}
