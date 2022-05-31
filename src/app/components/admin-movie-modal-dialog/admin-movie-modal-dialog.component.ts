import { Component, OnInit, Inject, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalFormAction } from 'src/app/common/modalFormAction';
import { MovieDetail } from '../../models/movie/movieDetail';
import { MovieService } from '../../services/movie.service';
import { CountryRef } from '../../models/countryRef';
import { DirectorDetail } from '../../models/director/directorDetail';
import { Genre } from 'src/app/models/genre/genre';
import { ActorDetail } from '../../models/actor/actorDetail';
import { MovieCreate } from '../../models/movie/movieCreate';
import { MovieUpdate } from '../../models/movie/movieUpdate';

export interface MovieDialogData{
  id: number | null;
  action: ModalFormAction;
}

@Component({
  selector: 'app-admin-movie-modal-dialog',
  templateUrl: './admin-movie-modal-dialog.component.html',
  styleUrls: ['./admin-movie-modal-dialog.component.scss']
})
export class AdminMovieModalDialogComponent implements OnInit{

  id: number | null;
  action: ModalFormAction;
  titleDialog: string;
  btnActionName: string;

  movie: MovieDetail;
  countryList: CountryRef[];
  directorList: DirectorDetail[];
  genreList: Genre[];
  actorList: ActorDetail[];

  movieForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AdminMovieModalDialogComponent>,
    private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) private data: MovieDialogData) { }
    
  ngOnInit(): void {
    this.id = this.data.id;
    this.action = this.data.action;

    if(this.action == ModalFormAction.Create){
      this.titleDialog = "Добавление фильма";
      this.btnActionName = "Добавить";
    } else {
      this.titleDialog = "Редактирование карточки фильма";
      this.btnActionName = "Обновить";
    }

    this.getCountries();
    this.getDirectors();
    this.getGenres();
    this.getActors();

    this.movieForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
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
        this.movieForm.patchValue(res);
        this.movieForm.patchValue({country:{id:res.countryId, name:res.country}});
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
      this.actorList = res;
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

clickOnAction(){
  if (this.action == ModalFormAction.Create){
    this.createMovie();
  } else if (this.action == ModalFormAction.Update){
    this.updateMovie();
  }
}

compareObjects(object1: any, object2: any) {
  return object1 && object2 && object1.id == object2.id;
}

updateMovie(){
  let name = this.movieForm.value.name;
  let countryId = this.movieForm.value.country.id ? Number(this.movieForm.value.country.id) : null;
  let country = this.movieForm.value.country.name;
  let year = this.movieForm.value.year ? Number(this.movieForm.value.year) : null;
  let description = this.movieForm.value.description;
  let movieUrl = this.movieForm.value.movieUrl;
  let imageUrl = this.movieForm.value.imageUrl;
  let directorId = this.movieForm.value.director ? Number(this.movieForm.value.director.id) : null;
  let actors = this.movieForm.value.actors.map((x: { id: number; })=>x.id);
  let genres = this.movieForm.value.genres.map((x: { id: number; })=>x.id);

  let movieUpdate = new MovieUpdate(this.id,name,countryId,country,year,
    description,movieUrl,imageUrl,directorId,genres,actors);
  
  this.movieService.updateMovie(movieUpdate).subscribe(res=>{
    location.reload();
  }, error=> console.log(error));
}

createMovie(){
  let name = this.movieForm.value.name;
  let countryId = this.movieForm.value.country.id ? Number(this.movieForm.value.country.id) : null;
  let country = this.movieForm.value.country.name;
  let year = this.movieForm.value.year ? Number(this.movieForm.value.year) : null;
  let description = this.movieForm.value.description;
  let movieUrl = this.movieForm.value.movieUrl;
  let imageUrl = this.movieForm.value.imageUrl;
  let directorId = this.movieForm.value.director ? Number(this.movieForm.value.director.id) : null;
  let actors = this.movieForm.value.actors.map(x=>x.id);
  let genres = this.movieForm.value.genres.map(x=>x.id);

  let movieCreate = new MovieCreate(name,countryId,country,year,description,movieUrl,imageUrl,directorId,actors,genres);
  this.movieService.createMovie(movieCreate).subscribe(res=>{
    location.reload();
  }, error=> console.log(error));
}

}
