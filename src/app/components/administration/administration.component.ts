import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieItem } from '../../models/movieItem';
import {MatTable} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdminMovieModalDialogComponent } from '../admin-movie-modal-dialog/admin-movie-modal-dialog.component';
import { MovieDetail } from '../../models/movieDetail';
import { ModalFormAction } from 'src/app/common/modalFormAction';

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


  constructor(private movieService: MovieService,
          public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(){
    this.movieService.getMovies(null).subscribe(res=>{
      this.movies = res['items'];
      this.moviesTotal = res['total'];
      console.log(this.movies);
    })
  }

  openDialog(movieId:number){

    const dialogRef = this.dialog.open(AdminMovieModalDialogComponent, {
      width: '500px',
      data: {id: movieId, action: ModalFormAction.Update},
      panelClass: 'app-full-bleed-dialog',
      autoFocus: false
    });
  }
}
