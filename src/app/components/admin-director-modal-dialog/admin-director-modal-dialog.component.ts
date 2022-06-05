import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalFormAction } from 'src/app/common/modalFormAction';
import { CountryRef } from 'src/app/models/countryRef';
import { MovieService } from 'src/app/services/movie.service';
import { DirectorDetail } from '../../models/director/directorDetail';
import { DirectorCreate } from '../../models/director/directorCreate';
import { DirectorUpdate } from '../../models/director/directorUpdate';

export interface MovieDialogData{
  id: number | null;
  action: ModalFormAction;
}

@Component({
  selector: 'app-admin-director-modal-dialog',
  templateUrl: './admin-director-modal-dialog.component.html',
  styleUrls: ['./admin-director-modal-dialog.component.scss',
            '../admin-movie-modal-dialog/admin-movie-modal-dialog.component.scss']
})
export class AdminDirectorModalDialogComponent implements OnInit {

  id: number | null;
  action: ModalFormAction;
  titleDialog: string;
  btnActionName: string;

  director: DirectorDetail;
  directorForm: FormGroup;
  countryList: CountryRef[];

  constructor(private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) private data: MovieDialogData) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.action = this.data.action;

    this.getCountries();

    if(this.action == ModalFormAction.Create){
      this.titleDialog = "Добавление режиссёра";
      this.btnActionName = "Добавить";
    } else {
      this.titleDialog = "Редактирование карточки режиссёра";
      this.btnActionName = "Обновить";
    }

    this.directorForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      lastName: new FormControl(null),
      imageUrl: new FormControl(null),
      country: new FormControl(null),
      birthDate: new FormControl(null),
      description: new FormControl(null)
    });

    this.getDirectorDetail(this.id);
  }

  getCountries(){
    this.movieService.getCounties().subscribe(res=>{
      this.countryList = res;
    })
  }

  compareObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  getDirectorDetail(id: number){
    if (id === 0){
    }
    else{
      this.movieService.getDirectorById(id).subscribe(res=>{
        this.director = res;
        this.directorForm.patchValue(res);
        this.directorForm.patchValue({country:{id:res.countryId, name:res.country}});
        console.log(res.birthDate.toString());
        this.directorForm.patchValue({birthDate: res.birthDate.toString().substr(0,10)});
      });
    }
  }

  clickOnAction(){
    if (this.action == ModalFormAction.Create){
      this.createDirector();
    } else if (this.action == ModalFormAction.Update){
      this.updateDirector();
    }
  }
  
  createDirector() { 
    let name = this.directorForm.value.name;
    let lastName = this.directorForm.value.lastName;
    let imageUrl = this.directorForm.value.imageUrl;
    let countryId = this.directorForm.value.country.id ? Number(this.directorForm.value.country.id) : null;
    let country = this.directorForm.value.country.name;
    let birthDate = this.directorForm.value.birthDate ? new Date(this.directorForm.value.birthDate).toISOString() : null;
    let description = this.directorForm.value.description;

    let directorCreate = new DirectorCreate(name, lastName,imageUrl,countryId, country,birthDate,description);
    this.movieService.createDirector(directorCreate).subscribe(res=>{
      location.reload();
    }, error=> console.log(error));
  }

  updateDirector() { 
    let name = this.directorForm.value.name;
    let lastName = this.directorForm.value.lastName;
    let imageUrl = this.directorForm.value.imageUrl;
    let countryId = this.directorForm.value.country.id ? Number(this.directorForm.value.country.id) : null;
    let country = this.directorForm.value.country.name;
    let birthDate = this.directorForm.value.birthDate ? new Date(this.directorForm.value.birthDate).toISOString() : null;
    let description = this.directorForm.value.description;

    let directorUpdate = new DirectorUpdate(this.director.id,name, lastName,imageUrl,countryId,country,birthDate,description,this.director.createdAt);
    this.movieService.updateDirector(directorUpdate).subscribe(res=>{
      location.reload();
    }, error=> console.log(error));
  }

}
