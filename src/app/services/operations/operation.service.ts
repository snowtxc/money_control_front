import { Injectable, OnInit } from '@angular/core';

import {HttpClient,HttpHeaders} from "@angular/common/http";
import { Subject, Observable ,throwError} from 'rxjs';


import { catchError } from 'rxjs/operators';
import { retry,map} from 'rxjs/operators';

import { environment } from 'src/app/_helpers/enviroment';

@Injectable({
  providedIn: 'root'
})
export class OperationService { 
  public currentDataFilterSubject : Subject<any>; 


  constructor(private _http:HttpClient) { 
    this.currentDataFilterSubject = new Subject();
    
  }



  sendDataFilter(data:any){
    this.currentDataFilterSubject.next(data);
  }



  createOperation(amount:number,concept:string,type:string):Observable<any>{
    const body ={
      amount: amount,
      concept: concept,
      type: type
    }
    const headers = new HttpHeaders();
    return this._http.post(environment.baseUrl+"/operations",body,{headers:headers}).pipe(catchError((err) =>{
      retry(3);
      return throwError(err.error);
    }));
  }

  getOperations():Observable<any>{
    return this._http.get(environment.baseUrl+"/operations").pipe(catchError((err) =>{
      retry(3);
      return throwError(err.error);
    }));
    
   }


  deleteOperation(idOperation: number):Observable<any>{
    return this._http.delete(environment.baseUrl+"/operations/"+idOperation).pipe(catchError((err)=>{
      retry(3);
      return throwError(err.error);
    }));
  }


  
  editOperation(idOperation:number, amount:number,concept:string):Observable<any>{
    const body ={
      amount: amount,
      concept: concept
    } 
    const headers = new HttpHeaders();

    return this._http.put(environment.baseUrl+"/operations/"+idOperation,body,{headers:headers}).pipe(catchError((err) =>{
      retry(3);
      return throwError(err.error);
    }));

  }


  setCategory(operationID:number,categoryID:any):Observable<any>{
    const body ={
      id_operation: operationID,
      id_category: categoryID
    }
    const headers = new HttpHeaders()
    return this._http.post(environment.baseUrl +"/operations/associateCategory",body,{headers:headers}).pipe(catchError((err) =>{
      retry(3);
      return throwError(err.error);
    }))

  }

 


  


}
