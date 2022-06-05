import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalFormAction } from 'src/app/common/modalFormAction';
import { RemoveDataType } from 'src/app/common/removeDataType';
import { ActorDetail } from '../../models/actor/actorDetail';
import { MovieService } from '../../services/movie.service';
import { AdminActorModalDialogComponent } from '../admin-actor-modal-dialog/admin-actor-modal-dialog.component';
import { ConfirmationDeleteDialogComponent } from '../confirmation-delete-dialog/confirmation-delete-dialog.component';

@Component({
  selector: 'app-administration-actor',
  templateUrl: './administration-actor.component.html',
  styleUrls: ['./administration-actor.component.scss',
              '../administration/administration.component.scss']
})
export class AdministrationActorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  removeDataType = RemoveDataType;
  actors : MatTableDataSource<ActorDetail>;
  actorFilterText: string;
  displayedColumns: string[] = ['id', 'name', 'lastName', 'country', 'update', 'remove'];

  constructor(private movieService: MovieService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getActors();
  }


  getActors(){
    this.movieService.getActorsDetails().subscribe(res=>{
      this.actors = new MatTableDataSource<ActorDetail>(res);
      this.actors.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Элементов на странице:";
    })
  }

  openDialog(actorId:number){
    let action: ModalFormAction;

    if(actorId == 0){
      action = ModalFormAction.Create;
    } else {
      action = ModalFormAction.Update;
    }

    const dialogRef = this.dialog.open(AdminActorModalDialogComponent, {
      width: '600px',
      height:'auto',
      data: {id: actorId, action: action},
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
    this.actors.filter = this.actorFilterText.trim().toLowerCase();
  }
}
