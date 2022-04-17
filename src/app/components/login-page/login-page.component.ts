import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs'
import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null,[Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    })
  }

  signIn(){
    this.form.disable();
    this.aSub = this.auth.login(this.form.value.username, this.form.value.password).subscribe(
      res =>  {
        this.router.navigate(['']);
      },
      error => {
        alert('Wrong login or password');
      })
      this.form.enable();
  }

}
