import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class localStorageService {

  constructor() { }


  getToken(): string | null{
    return localStorage.getItem("token");
  }

  setToken(token:string){
    localStorage.setItem("token",token);
  }

  destroyToken(){
    localStorage.removeItem('token');
  }


  getDataUser(): string | null{
    return  localStorage.getItem('datauser');
  }

  setDataUser(datauser:any){
    const stringDataUser = JSON.stringify(datauser);
    localStorage.setItem("datauser",stringDataUser);
  }

  destroyDataUser() {
    localStorage.removeItem('datauser');
  }




}
