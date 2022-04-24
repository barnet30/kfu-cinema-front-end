import { Component } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'kfu-cinema-front-end';

  public get isLoggedIn(): boolean{
    return this.as.isAunthenticated();
  }

  constructor(private as: AccountService){ }
  
  login(username: string, password: string){
    this.as.login(username, password)
      .subscribe(result => {

      }, error => {
        alert('Wrong login or password')
      })
  }

  logout(){
    this.as.logout();
  }
}
