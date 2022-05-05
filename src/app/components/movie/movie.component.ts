import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieDetail } from '../../models/movieDetail';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { ActorDetail } from '../../models/actorDetail';
import { AccountService } from '../../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieDetailComponent implements OnInit {
  
  public movie: MovieDetail;
  public movieGenres: Genre[];
  public movieActors: ActorDetail[];
  public estimate: number;
  id: number | undefined;
	private isModalDialogVisible: boolean = false;


  constructor(private movieService:MovieService,
    private route: ActivatedRoute,
    private authService: AccountService,
    public dialog: MatDialog) { }

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

  updateMovieRating(estimation:number){

    if (!this.isAuthenticated()){
      this.showDialog();
      return;
    }

    this.movieService.updateMovieRating(estimation,this.movie.id).subscribe(res=>
      {}
      ,error=>console.log(error));
  }

  showDialog() {
    const dialogRef = this.dialog.open(ModalDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  isAuthenticated() : boolean {
    return this.authService.isAunthenticated();
  }
}
