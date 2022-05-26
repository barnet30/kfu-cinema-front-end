import { Component, OnInit } from '@angular/core';
import { ActorDetail } from '../../models/actorDetail';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-administration-actor',
  templateUrl: './administration-actor.component.html',
  styleUrls: ['./administration-actor.component.scss',
              '../administration/administration.component.scss']
})
export class AdministrationActorComponent implements OnInit {

  actors: ActorDetail[];
  displayedColumns: string[] = ['id', 'name', 'lastName', 'country', 'update', 'remove'];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getActors();
  }


  getActors(){
    this.movieService.getActorsDetails().subscribe(res=>{
      this.actors = res;
    })
  }
}
