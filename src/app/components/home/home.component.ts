import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormBuilder, Form} from "@angular/forms";
import { Operation } from 'src/app/models/Operation';


import {AuthenticationService} from "../../services/authentication/authentication.service"; 


declare var M:any
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
              './responsive.css'
]
})

export class HomeComponent implements OnInit {

  constructor(private _builderForm:FormBuilder,private _auth:AuthenticationService) { }

  ngOnInit(): void { 
    
  }

}





