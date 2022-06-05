import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalFormAction } from 'src/app/common/modalFormAction';
import { CountryRef } from 'src/app/models/countryRef';
import { MovieService } from 'src/app/services/movie.service';
import { ActorDetail } from '../../models/actor/actorDetail';
import { ActorCreate } from '../../models/actor/actorCreate';
import { ActorUpdate } from '../../models/actor/actorUpdate';

export interface MovieDialogData{
  id: number | null;
  action: ModalFormAction;
}

@Component({
  selector: 'app-admin-actor-modal-dialog',
  templateUrl: './admin-actor-modal-dialog.component.html',
  styleUrls: ['./admin-actor-modal-dialog.component.scss',
              '../admin-movie-modal-dialog/admin-movie-modal-dialog.component.scss']
})
export class AdminActorModalDialogComponent implements OnInit {

  id: number | null;
  action: ModalFormAction;
  titleDialog: string;
  btnActionName: string;

  actor: ActorDetail;
  actorForm: FormGroup;
  countryList: CountryRef[];

  constructor(private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) private data: MovieDialogData) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.action = this.data.action;

    this.getCountries();
    if(this.action == ModalFormAction.Create){
      this.titleDialog = "Добавление актёра";
      this.btnActionName = "Добавить";
    } else {
      this.titleDialog = "Редактирование карточки актёра";
      this.btnActionName = "Обновить";
    }

    this.actorForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      lastName: new FormControl(null),
      imageUrl: new FormControl(null),
      country: new FormControl(null),
      birthDate: new FormControl(null),
      description: new FormControl(null)
    });

    this.getActorDetail(this.id);
  }

  getActorDetail(id: number){
    if (id === 0){
    }
    else{
      this.movieService.getActorById(id).subscribe(res=>{
        this.actor = res;
        this.actorForm.patchValue(res);
        this.actorForm.patchValue({country:{id:res.countryId, name:res.country}});
        console.log(res.birthDate.toString());
        this.actorForm.patchValue({birthDate: res.birthDate.toString().substr(0,10)});
      });
    }
  }

  clickOnAction(){
    if (this.action == ModalFormAction.Create){
      this.createActor();
    } else if (this.action == ModalFormAction.Update){
      this.updateActor();
    }
  }

  createActor(){
    let name = this.actorForm.value.name;
    let lastName = this.actorForm.value.lastName;
    let imageUrl = this.actorForm.value.imageUrl;
    let countryId = this.actorForm.value.country.id ? Number(this.actorForm.value.country.id) : null;
    let country = this.actorForm.value.country.name;
    let birthDate = this.actorForm.value.birthDate ? new Date(this.actorForm.value.birthDate).toISOString() : null;
    let description = this.actorForm.value.description;

    let actorCreate = new ActorCreate(name, lastName,imageUrl,countryId, country,birthDate,description);
    this.movieService.createActor(actorCreate).subscribe(res=>{
      location.reload();
    }, error=> console.log(error));
  }

  updateActor(){
    let name = this.actorForm.value.name;
    let lastName = this.actorForm.value.lastName;
    let imageUrl = this.actorForm.value.imageUrl;
    let countryId = this.actorForm.value.country.id ? Number(this.actorForm.value.country.id) : null;
    let country = this.actorForm.value.country.name;
    let birthDate = this.actorForm.value.birthDate ? new Date(this.actorForm.value.birthDate).toISOString() : null;
    let description = this.actorForm.value.description;

    let actorUpdate = new ActorUpdate(this.actor.id,name, lastName,imageUrl,countryId,country,birthDate,description,this.actor.createdAt);
    this.movieService.updateActor(actorUpdate).subscribe(res=>{
      location.reload();
    }, error=> console.log(error));
  }

  getCountries(){
    this.movieService.getCounties().subscribe(res=>{
      this.countryList = res;
    })
  }

  compareObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }
}
