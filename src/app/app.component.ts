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
  private route: ActivatedRoute;
  username: string;

  public get isLoggedIn(): boolean{
    return this.as.isAunthenticated();
  }

  constructor(private as: AccountService){ }
  
  logout(){
    this.as.logout();
  }

  getUsername() : string{
    return this.username = this.as.getUsername();
  }
}
