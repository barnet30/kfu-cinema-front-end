import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieDetail } from '../../models/movieDetail';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { ActorDetail } from '../../models/actorDetail';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieDetailComponent implements OnInit {
  
  public movie: MovieDetail;
  public movieGenres: Genre[];
  public movieActors: ActorDetail[];
  id: number | undefined;


  constructor(private movieService:MovieService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
  )
  .subscribe(data=> this.id = +data);

    this.getMovie(this.id);
  }

  getMovie(id:number) {
    this.movieService.getMovieById(id).subscribe(res=>{
      this.movie = res;
      this.movieGenres = res['genres'];
      this.movieActors = res['actors'];
    }, error=>console.log(error));
  }
}
