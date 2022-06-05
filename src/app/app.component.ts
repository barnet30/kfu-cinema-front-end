import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'kfu-cinema-front-end';
  username: string;

  public get isLoggedIn(): boolean{
    return this.authService.isAunthenticated();
  }

  public get isAdmin(): boolean{
    return this.authService.isAdmin();
  }

  constructor(private authService: AccountService){ }
  
  logout(){
    this.authService.logout();
  }

  getUsername() : string{
    return this.username = this.authService.getUsername();
  }

}
