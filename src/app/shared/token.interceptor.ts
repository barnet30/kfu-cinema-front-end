import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private ac: AccountService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.ac.isAunthenticated()){
            req = req.clone({
                setHeaders: {
                    Authorization: this.ac.getToken()
                }
            })
        }

        return next.handle(req);
    }
}