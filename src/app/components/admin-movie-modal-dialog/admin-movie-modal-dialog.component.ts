import { Component, OnInit, Inject, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalFormAction } from 'src/app/common/modalFormAction';
import { MovieDetail } from '../../models/movieDetail';
import { MovieService } from '../../services/movie.service';
import { CountryRef } from '../../models/countryRef';

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
  movie: MovieDetail;
  countryList: CountryRef[];

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

    this.getCountries();
    this.movieForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      countryId: new FormControl(null),
      country: new FormControl(null),
      year: new FormControl(null),
      description: new FormControl(null),
      movieUrl: new FormControl(null),
      imageUrl: new FormControl(null),
      // directorId: new FormControl(null),
      genres: new FormControl(null)
    });

    this.getMovieDetail(this.id);
      // console.log(this.movieForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getMovieDetail(id: number){

    if (id === 0){
      this.movieForm.reset();
    }
    else{
      this.movieService.getMovieById(id).subscribe(res=>{
        this.movie = res;
        this.movieForm.patchValue(res);
      });
    }
  }

  getCountries(){
    this.movieService.getCounties().subscribe(res=>{
      this.countryList = res;
    })
  }

  updateMovie(){

  }
}
