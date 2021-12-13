import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor(private as: AccountService) { }

  ngOnInit(): void {
  }

  public get isLoggedIn(): boolean{
    return this.as.isAunthenticated();
  }
}
