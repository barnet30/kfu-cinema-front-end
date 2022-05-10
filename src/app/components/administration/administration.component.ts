import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieItem } from '../../models/movieItem';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  movies: MovieItem[];
  moviesTotal: number;
  displayedColumns: string[] = ['id', 'name', 'country','update'];

  @ViewChild(MatTable) table: MatTable<MovieItem>;


  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(){
    return this.movieService.getMovies(null).subscribe(res=>{
      this.movies = res['items'];
      this.moviesTotal = res['total'];
      console.log(this.movies);

    })
  }

  testClick(){
    location.reload();
  }

}
