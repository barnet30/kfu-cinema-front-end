import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormAction } from 'src/app/common/modalFormAction';
import { MovieService } from 'src/app/services/movie.service';
import { AdminGenreModalDialogComponent } from '../admin-genre-modal-dialog/admin-genre-modal-dialog.component';
import { Genre } from '../../models/genre/genre';
import { MatTableDataSource } from '@angular/material/table';
import { RemoveDataType } from 'src/app/common/removeDataType';
import { ConfirmationDeleteDialogComponent } from '../confirmation-delete-dialog/confirmation-delete-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-administration-genre',
  templateUrl: './administration-genre.component.html',
  styleUrls: ['./administration-genre.component.scss', '../administration/administration.component.scss']
})
export class AdministrationGenreComponent implements OnInit {

  genreFilterText: string;
  genres: MatTableDataSource<Genre>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'createdAt', 'update', 'remove'];
  removeDataType = RemoveDataType;

  constructor(private movieService: MovieService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(){
    this.movieService.getGenres().subscribe(res=>{
      this.genres = new MatTableDataSource<Genre>(res);
      this.genres.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Элементов на странице:";
    })
  }

  openDialog(genreId:number){
    let action: ModalFormAction;

    if(genreId == 0){
      action = ModalFormAction.Create;
    } else {
      action = ModalFormAction.Update;
    }

    const dialogRef = this.dialog.open(AdminGenreModalDialogComponent, {
      width: '600px',
      height:'auto',
      data: {id: genreId, action: action},
      panelClass: 'app-full-bleed-dialog',
      autoFocus: false,
    });
  }

  applyFilter(){
    this.genres.filter = this.genreFilterText.trim().toLowerCase();
  }

  openConfirmationDialog(id: number, name: string, removeDataType: RemoveDataType){

    const dialogRef = this.dialog.open(ConfirmationDeleteDialogComponent, {
      width: '350px',
      height:'auto',
      data: {id: id, name: name, dataType: removeDataType},
      autoFocus: false,
    });
  }
}
