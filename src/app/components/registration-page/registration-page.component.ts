import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  form: FormGroup
  aSub: Subscription
  
  constructor(private auth: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null,[Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      email: new FormControl(null, [Validators.required, Validators.email])
    })
  }

  signUp(){
    this.form.disable();
    this.aSub = this.auth.register(this.form.value.username, this.form.value.password, this.form.value.email).subscribe(
      res =>  {
        this.router.navigate(['']);
      },
      error => {
        alert('Something went wrong');
      })
      this.form.enable();
  }

}
