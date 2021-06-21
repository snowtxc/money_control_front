import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  constructor(private _auth:AuthenticationService,private _router:Router){

  }
  canActivate(): boolean {
    if(this._auth.isLogged()){
      return true;
    }
    
    this._router.navigate(["login"]);
    return false;
     
  }  
}

