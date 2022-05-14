import { Component, OnInit, Inject, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalFormAction } from 'src/app/common/modalFormAction';
import { MovieDetail } from '../../models/movieDetail';
import { MovieService } from '../../services/movie.service';
import { CountryRef } from '../../models/countryRef';
import { DirectorDetail } from '../../models/directorDetail';
import { Genre } from 'src/app/models/genre';
import { ActorDetail } from '../../models/actorDetail';

export interface MovieDialogData{
  id: number | null;
  action: ModalFormAction;
}

@Component({
  selector: 'app-admin-movie-modal-dialog',
  templateUrl: './admin-movie-modal-dialog.component.html',
  styleUrls: ['./admin-movie-modal-dialog.component.scss']
})
export class AdminMovieModalDialogComponent implements OnInit, AfterContentInit{

  id: number | null;
  action: ModalFormAction;
  titleDialog: string;
  btnActionName: string;

  movie: MovieDetail;
  movieGenresIds: number[];
  movieActorIds: number[];
  countryList: CountryRef[];
  directorList: DirectorDetail[];
  genreList: Genre[];
  actorList: ActorDetail[];

  movieForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AdminMovieModalDialogComponent>,
    private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) private data: MovieDialogData) { }

    ngAfterContentInit(): void {

    if(this.action === ModalFormAction.Update){
      
    }
  }
    
  ngOnInit(): void {
    this.id = this.data.id;
    this.action = this.data.action;

    if(this.action == ModalFormAction.Create){
      this.titleDialog = "Создание фильма";
      this.btnActionName = "Добавить";
    } else {
      this.titleDialog = "Редактирование фильма";
      this.btnActionName = "Обновить";
    }

    this.getCountries();
    this.getDirectors();
    this.getGenres();
    this.getActors();
    this.movieForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      countryId: new FormControl(null),
      country: new FormControl(null),
      year: new FormControl(null),
      description: new FormControl(null),
      movieUrl: new FormControl(null),
      imageUrl: new FormControl(null),
      director: new FormControl(null),
      genres: new FormControl(null),
      actors: new FormControl(null)
    });

    this.getMovieDetail(this.id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getMovieDetail(id: number){

    if (id === 0){
    }
    else{
      this.movieService.getMovieById(id).subscribe(res=>{
        this.movie = res;
        this.movieGenresIds = res.genres.map(x=>x.id);
        this.movieActorIds = res.actors.map(x=>x.id);
        this.movieForm.patchValue(res);
      });
    }
  }

  getCountries(){
    this.movieService.getCounties().subscribe(res=>{
      this.countryList = res;
    })
  }

  getDirectors(){
    this.movieService.getDirectorsDetails().subscribe(res=>{
      this.directorList = res;
    })
  }

  getGenres(){
    this.movieService.getGenres().subscribe(res=>{
      this.genreList = res;
    })
  }

  getActors(){
    this.movieService.getActorsDetails().subscribe(res=>{
      this.actorList = res['items'];
    })
  }

onKey(value: EventTarget) { 
  let text = (value as HTMLInputElement).value;
  console.log(text);
  if (text == null || text ==''){
    this.getActors();
    return;
  }
  this.actorList = this.search(text);
}

search(value: string) { 
  let filter = value.toLowerCase();
  return this.actorList.filter(option => option.name.toLowerCase().includes(filter) 
  || option.lastName.toLowerCase().includes(filter));
}

  updateMovie(){

  }
}
