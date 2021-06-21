import { Injectable } from '@angular/core';

import { HttpHandler, HttpInterceptor, HttpRequest,HttpEvent } from '@angular/common/http';
import { localStorageService } from 'src/app/services/localstorage/localStorage.service';
import { nextTick } from 'q';
import { Router } from "@angular/router";

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _localStorageService:localStorageService,private _router:Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    request = this.addToken(request);
    return next.handle(request);

  }

  private addToken(request:HttpRequest<any>){
    const token = this._localStorageService.getToken();
    if(token){

      let headers = request.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', token); 

      const cloneReq = request.clone({ headers });
      return cloneReq; 
    }else{
      this._router.navigate(['/login']);
    }
    
    return request;
  }



}
