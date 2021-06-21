import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";


import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
              './responsive.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public formError: string = '';
  public submited = false;

  constructor(private _builderForm:FormBuilder,private _auth:AuthenticationService,private _router:Router) {
    this.formLogin = this._builderForm.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
   }



  ngOnInit(): void {
  }


  onSubmitForm(){
    this.submited = true;
    if(this.formLogin.invalid){
      return
    } 
    
    const email = this.formLogin.controls['email'].value;
    const password = this.formLogin.controls['password'].value;

    this._auth.authenticate(email,password).subscribe(result =>{
      this._router.navigate(['']);
    },
    error =>{
      this.formError = error;
    })
  }

}
