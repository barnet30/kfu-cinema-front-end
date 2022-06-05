import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalFormAction } from 'src/app/common/modalFormAction';
import { MovieService } from 'src/app/services/movie.service';
import { Genre } from '../../models/genre/genre';
import { GenreCreate } from '../../models/genre/genreCreate';

export interface MovieDialogData{
  id: number | null;
  action: ModalFormAction;
}

@Component({
  selector: 'app-admin-genre-modal-dialog',
  templateUrl: './admin-genre-modal-dialog.component.html',
  styleUrls: ['./admin-genre-modal-dialog.component.scss',
  '../admin-movie-modal-dialog/admin-movie-modal-dialog.component.scss']
})
export class AdminGenreModalDialogComponent implements OnInit {

  id: number | null;
  action: ModalFormAction;
  titleDialog: string;
  btnActionName: string;

  genre: Genre;
  genreForm: FormGroup;

  constructor(private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) private data: MovieDialogData) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.action = this.data.action;

    if(this.action == ModalFormAction.Create){
      this.titleDialog = "Добавление жанра";
      this.btnActionName = "Добавить";
    } else {
      this.titleDialog = "Редактирование жанра";
      this.btnActionName = "Обновить";
    }
    
    this.genreForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      description: new FormControl(null)
    });

    this.getGenre(this.id);
  }

  getGenre(genreId: number){
    if (genreId === 0){
    }
    else{
      this.movieService.getGenreById(genreId).subscribe(res=>{
        this.genre = res;
        this.genreForm.patchValue(res);
      });
    }
  }

  clickOnAction(){
    if (this.action == ModalFormAction.Create){
      this.createGenre();
    } else if (this.action == ModalFormAction.Update){
      this.updateGenre();
    }
  }
  
  createGenre() {
    let name = this.genreForm.value.name;
    let description = this.genreForm.value.description;

    let genreCreate = new GenreCreate(name, description);
    this.movieService.createGenre(genreCreate).subscribe(res=>{
      location.reload();
    }, error=> console.log(error));
  }

  updateGenre() {
    let name = this.genreForm.value.name;
    let description = this.genreForm.value.description;

    let genreUpdate = new Genre(this.genre.id ,name,description,this.genre.createdAt);
    this.movieService.updateGenre(genreUpdate).subscribe(res=>{
      location.reload();
    }, error=> console.log(error));
  }
}
