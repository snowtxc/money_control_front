import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public username: string = '';

  constructor(private _auth:AuthenticationService,private _router:Router) { }

  ngOnInit(): void {
    $(".dropdown-trigger").dropdown();
    this.loadUser();
  }

  loadUser(){
    this._auth.dataUser$.subscribe(data =>{
      if(!data){
        this._router.navigate(["login"])
        return;
      }
      this.username = data.username;
    },
    
    error =>{
      console.log(error);
    })
    
  }

  onlogoutBtn(){
    this._auth.destroyUserSesion();

  }


}
