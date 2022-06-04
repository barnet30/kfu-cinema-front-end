import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Category } from 'src/app/common/category';
import { ModalFormAction } from 'src/app/common/modalFormAction';
import { RemoveDataType } from 'src/app/common/removeDataType';
import { MovieFilterParameters } from 'src/app/models/movie/movieFilterParameters';
import { MovieService } from 'src/app/services/movie.service';
import { MovieItem } from '../../models/movie/movieItem';
import { AdminMovieModalDialogComponent } from '../admin-movie-modal-dialog/admin-movie-modal-dialog.component';
import { ConfirmationDeleteDialogComponent } from '../confirmation-delete-dialog/confirmation-delete-dialog.component';

@Component({
  selector: 'app-administration-cartoon',
  templateUrl: './administration-cartoon.component.html',
  styleUrls: ['./administration-cartoon.component.scss', '../administration/administration.component.scss']
})
export class AdministrationCartoonComponent implements OnInit {

  movieFilterParameters: MovieFilterParameters = null;
  movieTablePageEvent: PageEvent;
  movies: MovieItem[];
  moviesTotal: number;
  movieFilterText: string;
  limit: number;
  displayedColumns: string[] = ['id', 'name', 'country', 'category', 'createdAt', 'update', 'remove'];

  defaultMovieFilterParams: MovieFilterParameters = new MovieFilterParameters(3,0);

  @ViewChild(MatTable) table: MatTable<MovieItem>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  removeDataType = RemoveDataType;


  constructor(private movieService: MovieService,
          public dialog: MatDialog) { }


  ngOnInit(): void {

    this.getMovies(this.defaultMovieFilterParams);
  }

  getMovies(filterParams: MovieFilterParameters){
    this.movieService.getCartoons(filterParams).subscribe(res=>{
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
