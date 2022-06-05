import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieItem } from '../../models/movie/movieItem';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdminMovieModalDialogComponent } from '../admin-movie-modal-dialog/admin-movie-modal-dialog.component';
import { ModalFormAction } from 'src/app/common/modalFormAction';
import { RemoveDataType } from '../../common/removeDataType';
import { ConfirmationDeleteDialogComponent } from '../confirmation-delete-dialog/confirmation-delete-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MovieFilterParameters } from '../../models/movie/movieFilterParameters';
import { Category } from '../../common/category';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  movieFilterParameters: MovieFilterParameters = null;
  movieTablePageEvent: PageEvent;
  movies: MovieItem[];
  moviesTotal: number;
  movieFilterText: string;
  limit: number;
  displayedColumns: string[] = ['id', 'name', 'country', 'category', 'createdAt', 'update', 'remove'];

  defaultMovieFilterParams: MovieFilterParameters = new MovieFilterParameters(5,0);

  @ViewChild(MatTable) table: MatTable<MovieItem>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  removeDataType = RemoveDataType;


  constructor(private movieService: MovieService,
          public dialog: MatDialog) { }


  ngOnInit(): void {

    this.getMovies(this.defaultMovieFilterParams);
  }

  getMovies(filterParams: MovieFilterParameters){
    this.movieService.getMovies(filterParams).subscribe(res=>{
      this.movies = res['items'];
      this.moviesTotal = res['total'];
      this.paginator._intl.itemsPerPageLabel="Элементов на странице:";
    })
  }

  openDialog(movieId:number){
    let action: ModalFormAction;

    if(movieId == 0){
      action = ModalFormAction.Create;
    } else {
      action = ModalFormAction.Update;
    }

    const dialogRef = this.dialog.open(AdminMovieModalDialogComponent, {
      width: '600px',
      height:'auto',
      data: {id: movieId, action: action},
      panelClass: 'app-full-bleed-dialog',
      autoFocus: false,
    });
  }

  openConfirmationDialog(id: number, name: string, removeDataType: RemoveDataType){

    const dialogRef = this.dialog.open(ConfirmationDeleteDialogComponent, {
      width: '350px',
      height:'auto',
      data: {id: id, name: name, dataType: removeDataType},
      // panelClass: 'app-full-bleed-dialog',
      autoFocus: false,
    });
  }

  onPaginateChange(event: PageEvent) {
    let offset = event.pageIndex;
    this.limit = event.pageSize;

    this.movieFilterParameters = new MovieFilterParameters(this.limit, offset);
    this.getMovies(this.movieFilterParameters);
  }

  applyFilter(){
    this.movieFilterParameters = new MovieFilterParameters(this.limit, 0);
    this.movieFilterParameters.name = this.movieFilterText;
    this.getMovies(this.movieFilterParameters);
  }

  getNameCategory(categoryId: Category) : string{
    if (categoryId == Category.Cartoon){
      return "Мультфильм";
    }

    if (categoryId == Category.Movie){
      return "Фильм";
    }

    if (categoryId == Category.TvSeries){
      return "Сериал";
    }

    return "none";
  }
}
