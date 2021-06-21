import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders} from "@angular/common/http";

//RXJS
import { Observable } from 'rxjs';
import {BehaviorSubject, throwError} from "rxjs";
import {catchError,retry,map} from "rxjs/operators";

import { environment } from 'src/app/_helpers/enviroment';
import {IUser} from "../../interfaces/User.interface";

import { localStorageService } from '../localstorage/localStorage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private behaviorSubject : BehaviorSubject<any>;
  public dataUser$: Observable<any>;


  constructor(private _http:HttpClient,private _localStorageService:localStorageService){

    this.behaviorSubject = new BehaviorSubject<any>(JSON.parse(this._localStorageService.getDataUser()!));
    this.dataUser$ = this.behaviorSubject.asObservable(); 
  }


  authenticate(email:string,password:string):Observable<any>{
    const payload ={
      email: email,
      password: password
    }
    //const headers = new HttpHeaders();
    return this._http.post(environment.baseUrl+"/auth/login",payload).pipe(catchError((err) =>{
      retry(3);
      return throwError(err.error);
    })).pipe(map(data =>{ 
      const obj = Object.create(data);

      const token = obj.token;
      const dataUser = {  username: obj.user.username }
      
      this.createUserSesion(token,dataUser);
    }))
  }


  registrarse(email:string,password:string,username:string){
    const payload = {
      email: email,
      password: password,
      username: username
    }
    const headers = new HttpHeaders();
    return this._http.post(environment.baseUrl+"/auth/register",payload,{headers:headers}).pipe(catchError((err) =>{
      retry(3);
      return throwError(err.error);
    })).pipe(map(data =>{ 
      
      const obj = Object.create(data);
      const token = obj.token;
      const datauser = {
        username: obj.user.username
      }
      this.createUserSesion(token, datauser);
    }))
  }


  createUserSesion(token:any,datauser:any){
    this._localStorageService.setToken(token);
    this._localStorageService.setDataUser(datauser);
    this.behaviorSubject.next(datauser); 
  }


  destroyUserSesion(){
    this._localStorageService.destroyToken();
    this._localStorageService.destroyDataUser();  
    this.behaviorSubject.next(null);

  }

  isLogged(){
    if(this.behaviorSubject.value != null){
      return true;
    }
    return false;

  }
  
}
