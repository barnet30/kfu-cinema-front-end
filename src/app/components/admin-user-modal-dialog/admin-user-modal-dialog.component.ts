import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';
import { Role } from '../../common/role';
import { Account } from '../../models/account/Account';
import { FormControl, FormGroup } from '@angular/forms';

export interface MovieDialogData{
  id: number | null;
}

@Component({
  selector: 'app-admin-user-modal-dialog',
  templateUrl: './admin-user-modal-dialog.component.html',
  styleUrls: ['./admin-user-modal-dialog.component.scss',
  '../admin-movie-modal-dialog/admin-movie-modal-dialog.component.scss']
})
export class AdminUserModalDialogComponent implements OnInit {

  constructor(private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) private data: MovieDialogData) {}
  
  id: number;
  account: Account;
  roleList = {"User": false, "Admin": false}
  role = Role;

  accountForm: FormGroup;

  ngOnInit(): void {
    this.id = this.data.id;

    this.accountForm = new FormGroup({
      id: new FormControl(null),
      username: new FormControl(null),
      roles: new FormControl(null)
    });

    this.getAccountById(this.id);
  }

  getAccountById(id: number) {
    this.accountService.getAccountById(id).subscribe(res=>{
      this.account = res;
      this.accountForm.patchValue(res);
      this.setRoleList(res);
    })
  }

  setRoleList(account: Account){
    let roles = account.roles;
    if (roles.includes(Role.User)){
      this.roleList["User"] = true;
    }
    if (roles.includes(Role.Admin)){
      this.roleList["Admin"] = true;
    }
  }

  onCheckChange(event){

    /* select role */
    if (event.target.checked){
      let checkValue = event.target.value;

      if (checkValue == Role.User){
        this.roleList["User"] = true;
      }

      if (checkValue == Role.Admin){
        this.roleList["Admin"] = true;
      }
    } 
    /* unselect role */
    else {
      let checkValue = event.target.value;

      if (checkValue == Role.User){
        this.roleList["User"] = false;
      }

      if (checkValue == Role.Admin){
        this.roleList["Admin"] = false;
      }
    }
  }

  updateRoles(){
    let accountRoles: Role[] = [];

    if (this.roleList["User"] == true){
      accountRoles.push(Role.User);
    }

    if(this.roleList["Admin"] == true){
      accountRoles.push(Role.Admin);
    }
    this.accountService.updateRoles(this.id, accountRoles).subscribe(res=>{
      location.reload();
    });
  }
}
