import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalFormAction } from 'src/app/common/modalFormAction';
import { RemoveDataType } from 'src/app/common/removeDataType';
import { Account } from 'src/app/models/account/Account';
import { AccountService } from '../../services/account.service';
import { ConfirmationDeleteDialogComponent } from '../confirmation-delete-dialog/confirmation-delete-dialog.component';
import { Role } from '../../common/role';
import { AdminUserModalDialogComponent } from '../admin-user-modal-dialog/admin-user-modal-dialog.component';

@Component({
  selector: 'app-administration-user',
  templateUrl: './administration-user.component.html',
  styleUrls: ['./administration-user.component.scss', '../administration/administration.component.scss']
})
export class AdministrationUserComponent implements OnInit {

  userFilterText: string;
  accounts: MatTableDataSource<Account>
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'username','email', 'createdAt', 'roles', 'remove'];
  removeDataType = RemoveDataType;
  Role=Role;

  constructor(private accountService: AccountService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(){
    this.accountService.getAccounts().subscribe(res=>{
      this.accounts = new MatTableDataSource<Account>(res);
      this.accounts.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Элементов на странице:";
    })
  }

  openDialog(accountId:number){
    const dialogRef = this.dialog.open(AdminUserModalDialogComponent, {
      width: '300px',
      height:'auto',
      data: {id: accountId},
      panelClass: 'app-full-bleed-dialog',
      autoFocus: false,
    });
  }



  openConfirmationDialog(id: number, name: string, removeDataType: RemoveDataType){

    const dialogRef = this.dialog.open(ConfirmationDeleteDialogComponent, {
      width: '350px',
      height:'auto',
      data: {id: id, name: name, dataType: removeDataType},
      autoFocus: false,
    });
  }
  
  applyFilter(){
    this.accounts.filter = this.userFilterText.trim().toLowerCase();
  }
}
