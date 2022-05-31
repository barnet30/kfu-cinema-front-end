import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalFormAction } from 'src/app/common/modalFormAction';
import { RemoveDataType } from 'src/app/common/removeDataType';
import { MovieService } from 'src/app/services/movie.service';
import { DirectorDetail } from '../../models/director/directorDetail';
import { AdminDirectorModalDialogComponent } from '../admin-director-modal-dialog/admin-director-modal-dialog.component';
import { ConfirmationDeleteDialogComponent } from '../confirmation-delete-dialog/confirmation-delete-dialog.component';

@Component({
  selector: 'app-administration-director',
  templateUrl: './administration-director.component.html',
  styleUrls: ['./administration-director.component.scss', '../administration/administration.component.scss']
})
export class AdministrationDirectorComponent implements OnInit {

  directors : MatTableDataSource<DirectorDetail>;
  directorFilterText: string;
  removeDataType = RemoveDataType;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'lastName', 'country', 'update', 'remove'];

  constructor(private movieService: MovieService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDirectors();
  }

  getDirectors(){
    this.movieService.getDirectorsDetails().subscribe(res=>{
      this.directors = new MatTableDataSource<DirectorDetail>(res);
      this.directors.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Элементов на странице:";
    })
  }

  openDialog(directorId:number){
    let action: ModalFormAction;

    if(directorId == 0){
      action = ModalFormAction.Create;
    } else {
      action = ModalFormAction.Update;
    }

    const dialogRef = this.dialog.open(AdminDirectorModalDialogComponent, {
      width: '600px',
      height:'auto',
      data: {id: directorId, action: action},
      panelClass: 'app-full-bleed-dialog',
      autoFocus: false,
    });
  }

  openConfirmationDialog(id: number, name: string, removeDataType: RemoveDataType){

    const dialogRef = this.dialog.open(ConfirmationDeleteDialogComponent, {
      width: '350px',
      height:'auto',
      data: {id: id, name: name, dataType: removeDataType},
      autoFocus: false,
    });
  }

  applyFilter(){
    this.directors.filter = this.directorFilterText.trim().toLowerCase();
  }
}
