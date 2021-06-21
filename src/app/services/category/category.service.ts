import { Injectable } from '@angular/core';
import  {HttpClient, HttpHeaders} from "@angular/common/http";

import { Observable ,Subject,throwError} from 'rxjs';
import { catchError,retry } from 'rxjs/operators';

import { environment } from 'src/app/_helpers/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

   public updateCategoriesSubject : Subject<any>;

  constructor(private _http:HttpClient) {
    this.updateCategoriesSubject = new Subject(); 
   }


  createCategory(name:string):Observable<any>{
    const body ={  name: name  }
    const headers = new HttpHeaders();
    return this._http.post(environment.baseUrl + "/category", body, { headers: headers }).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }))
  }



  getCategories(){
    return this._http.get(environment.baseUrl+"/category").pipe(catchError((err) =>{
      retry(3);
      return throwError(err.error);
    }))
  
  }


  emitEventUpdateCategories(){
    this.updateCategoriesSubject.next();
    
  }
}
