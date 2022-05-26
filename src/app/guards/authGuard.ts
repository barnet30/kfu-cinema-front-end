import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ACCESS_TOKEN_KEY, AccountService } from '../services/account.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private authService: AccountService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['']);
        return false;
    }
}