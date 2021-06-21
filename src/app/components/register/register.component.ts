import { Component, OnInit } from '@angular/core';

import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/MustMatch';
import {Router} from "@angular/router";

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css',
             './responsive.css']
})
export class RegisterComponent implements OnInit {

  public formRegister:FormGroup;
  public formError = '';
  public submited = false;

  constructor(private _builderForm:FormBuilder,private _auth:AuthenticationService,private _router:Router) { 
    this.formRegister = this._builderForm.group({
      email:  ['',[Validators.email,Validators.required]],
      username: ['',[Validators.required,Validators.minLength(5)]], 
      password:  ['',[Validators.required,Validators.minLength(8)]],
      confirmPassword: ['',[Validators.required,Validators.minLength(8)]]
    }, 
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
  }

  onSubmitForm(){
    this.submited = true;

    if(this.formRegister.invalid){
      return;
    }
    const email = this.formRegister.controls['email'].value;
    const password = this.formRegister.controls['password'].value;
    const username = this.formRegister.controls['username'].value; 

    this._auth.registrarse(email,password,username).subscribe(result =>{
      this._router.navigate(['']);
    },
    error =>{
      this.formError = error;
    })
  }

}
