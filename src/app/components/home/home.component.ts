import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { MovieService } from '../../services/movie.service';
import { Page } from '../../common/table.types';
import { MovieItem } from '../../models/movieItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public movies: Page<MovieItem>

  constructor(private auth: AccountService,
              private movieService: MovieService){ }

  ngOnInit(): void {
    this.getAllMovies();
  }

  public get isLoggedIn(): boolean{
    return this.auth.isAunthenticated();
  }

  getAllMovies(){
    this.movieService.getMovies().subscribe(res=>{
      this.movies = res
    })
  }
}
