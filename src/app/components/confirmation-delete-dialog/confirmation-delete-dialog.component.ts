import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RemoveDataType } from '../../common/removeDataType';
import { MovieService } from '../../services/movie.service';

export interface MovieDialogData{
  id: number | null;
  name: string;
  dataType: RemoveDataType;
}

@Component({
  selector: 'app-confirmation-delete-dialog',
  templateUrl: './confirmation-delete-dialog.component.html',
  styleUrls: ['./confirmation-delete-dialog.component.scss']
})
export class ConfirmationDeleteDialogComponent implements OnInit {

  id: number | null;
  name: string;
  dataType: RemoveDataType;

  constructor(public dialogRef: MatDialogRef<ConfirmationDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: MovieDialogData,
    private movieService: MovieService) { }

  ngOnInit(): void {

    this.id = this.data.id;
    this.name = this.data.name;
    this.dataType = this.data.dataType;

  }


  separateButtonAction(){

    if (this.dataType == RemoveDataType.Movie){
      this.removeMovie();
    } else if (this.dataType == RemoveDataType.Actor){
      this.removeActor();
    } else if (this.dataType == RemoveDataType.Genre){
      this.removeGenre();
    } else if (this.dataType == RemoveDataType.Director){
      this.removeDirector();
    }
  }

  removeMovie(){
    this.movieService.removeMovie(this.id).subscribe(res=>{
      location.reload();
    });
  }

  removeActor(){
    this.movieService.removeActor(this.id).subscribe(res=>{
      location.reload();
    });
  }

  removeGenre(){

  }

  removeDirector(){
    this.movieService.removeDirector(this.id).subscribe(res=>{
      location.reload();
    })
  }
}
