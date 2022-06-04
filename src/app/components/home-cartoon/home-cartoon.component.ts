import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SortingEnum } from 'src/app/common/table.types';
import { CountryRef } from 'src/app/models/countryRef';
import { Genre } from 'src/app/models/genre/genre';
import { MovieFilterParameters } from 'src/app/models/movie/movieFilterParameters';
import { MovieItem } from 'src/app/models/movie/movieItem';
import { AccountService } from 'src/app/services/account.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home-cartoon',
  templateUrl: './home-cartoon.component.html',
  styleUrls: ['./home-cartoon.component.scss', '../home/home.component.scss']
})
export class HomeCartoonComponent implements OnInit {
  public movies: MovieItem[];
  public total: number;
  public countries: CountryRef[];
  public genresList: Genre[];
  genres = new FormControl();
  filterForm: FormGroup;
  selectedCountry: string;
  movieFilter: MovieFilterParameters = null;

  pageNumbers: number[];
  pageSize: number = 2;
  activePage = 1;
  totalPages: number;

  pageSizeOptions: number[] = [2, 4, 6];
  sortColumns: Object = { "uploaddate": "Дате загрузки", "year": "Году выпуска", "name": "Названию", "rating": "Рейтигу" };
  sortOrder = SortingEnum;
  activeSortColumn: string;

  constructor(private auth: AccountService,
    private movieService: MovieService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllMovies();
    this.getCountriesRef();
    this.getAllGenres();
    this.filterForm = new FormGroup({
      yearFrom: new FormControl(null),
      yearTo: new FormControl(null),
      countryId: new FormControl(null),
      name: new FormControl(null),
      genres: new FormControl(null),
      sortColumn: new FormControl(null)
    });
  }

  public get isLoggedIn(): boolean {
    return this.auth.isAunthenticated();
  }

  movieNavigate(movieId:number){
    this.router.navigate(['movie', movieId]);
  }

  getAllMovies() {
    this.movieFilter = new MovieFilterParameters(this.pageSize, 0, "uploaddate", this.sortOrder.DESC);
    this.movieService.getCartoons(this.movieFilter).subscribe(res => {
      this.movies = res['items'];
      this.total = res['total'];
      this.filterForm.patchValue({ sortColumn: "uploaddate" });
      this.activeSortColumn = "uploaddate";
      this.totalPages = Math.trunc(this.total / this.pageSize) + 1;

      if (this.totalPages < 7) {
        this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      } else {
        this.pageNumbers = [1, 2, 3, 4, 5, 6]
      }
    });
  }

  getCountriesRef() {
    this.movieService.getCounties().subscribe(res => {
      this.countries = res;
    });
  }

  getAllGenres() {
    this.movieService.getGenres().subscribe(res => {
      this.genresList = res;
    });
  }

  applyFilters() {
    this.movieFilter.countryId = this.filterForm.value.countryId ? Number(this.filterForm.value.countryId) : null;
    this.movieFilter.yearFrom = this.filterForm.value.yearFrom ? Number(this.filterForm.value.yearFrom) : null;
    this.movieFilter.yearTo = this.filterForm.value.yearTo ? Number(this.filterForm.value.yearTo) : null;
    this.movieFilter.name = this.filterForm.value.name;
    this.movieFilter.genres = this.filterForm.value.genres;

    this.movieService.getMovies(this.movieFilter).subscribe(res => {
      this.movies = res['items'];
      this.total = res['total'];
      this.totalPages = Math.trunc(this.total / this.pageSize) + 1;

      if (this.totalPages < 7) {
        this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      } else {
        this.pageNumbers = [1, 2, 3, 4, 5, 6]
      }
    });
  }

  removeFilters() {
    this.pageSize = this.pageSizeOptions[0];
    this.getAllMovies();
    this.filterForm.reset();
  }

  pageChangeClick(page: number) {
    if (this.pageNumbers.indexOf(page) == 0) {
      if (this.pageNumbers[0] - 2 > 0) {
        this.pageNumbers = this.pageNumbers.map(i => i - 2);
      } else if (this.pageNumbers[0] - 1 > 0) {
        this.pageNumbers = this.pageNumbers.map(i => i - 1);
      }
    } else if (this.pageNumbers.indexOf(page) == 5) {
      if (this.pageNumbers[5] + 2 <= this.totalPages) {
        this.pageNumbers = this.pageNumbers.map(i => i + 2);
      } else if (this.pageNumbers[5] + 1 <= this.totalPages) {
        this.pageNumbers = this.pageNumbers.map(i => i + 1);
      }
    }

    this.activePage = page;
    this.movieFilter.offset = this.activePage - 1;
    this.movieService.getMovies(this.movieFilter).subscribe(res => {
      this.movies = res['items'];
    });
  }

  toFirstPage() {
    this.activePage = 1;
    if (this.totalPages < 7) {
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      this.pageNumbers = [1, 2, 3, 4, 5, 6]
    }

    this.movieFilter.offset = this.activePage - 1;
    this.movieService.getMovies(this.movieFilter).subscribe(res => {
      this.movies = res['items'];
    });
  }

  toPreviousPage() {
    if (this.activePage > 1) {
      if (this.pageNumbers[0] > 1 && this.pageNumbers.indexOf(this.activePage) == 0) {
        this.pageNumbers = this.pageNumbers.map(i => i - 1);
      }
      this.activePage = this.activePage - 1;
    }

    this.movieFilter.offset = this.activePage - 1;
    this.movieService.getMovies(this.movieFilter).subscribe(res => {
      this.movies = res['items'];
    });
  }

  toLastPage() {
    this.activePage = this.totalPages;
    if (this.totalPages < 7) {
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      this.pageNumbers = [this.totalPages - 5, this.totalPages - 4, this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages]
    }

    this.movieFilter.offset = this.activePage - 1;
    this.movieService.getMovies(this.movieFilter).subscribe(res => {
      this.movies = res['items'];
    });
  }

  toNextPage() {
    if (this.activePage < this.totalPages) {
      if (this.pageNumbers[5] < this.totalPages && this.pageNumbers.indexOf(this.activePage) == 5) {
        this.pageNumbers = this.pageNumbers.map(i => i + 1);
      }
      this.activePage = this.activePage + 1;
    }

    this.movieFilter.offset = this.activePage - 1;
    this.movieService.getMovies(this.movieFilter).subscribe(res => {
      this.movies = res['items'];
    });
  }

  selectPageSize() {
    this.movieFilter.limit = this.pageSize;
    this.activePage = 1;
    this.movieFilter.offset = this.activePage - 1;
    this.movieService.getMovies(this.movieFilter).subscribe(res => {
      this.movies = res['items'];
      this.totalPages = Math.trunc(this.total / this.pageSize) + 1;

      if (this.totalPages < 7) {
        this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      } else {
        this.pageNumbers = [1, 2, 3, 4, 5, 6]
      }
    });
  }

  selectSortColumn(sortColumnName: string) {
    if (this.activeSortColumn == sortColumnName) {
      this.movieFilter.sortOrder = this.movieFilter.sortOrder == SortingEnum.DESC ? SortingEnum.ASC : SortingEnum.DESC;
    } else {
      this.activeSortColumn = sortColumnName;
      this.movieFilter.sortOrder = SortingEnum.DESC;
    }

    this.movieFilter.sortColumn = sortColumnName;
    this.movieService.getMovies(this.movieFilter).subscribe(res => {
      this.movies = res['items'];
    });
  }

}
