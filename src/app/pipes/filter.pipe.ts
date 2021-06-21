import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, argCategoryFilter:any, argTypeFilter:string): any {
     let newValue:any = [];
      for(let i = 0; i < value.length;i++){
          if (this.searchByCategory(value[i],argCategoryFilter) && (this.searchByType(value[i],argTypeFilter))){  
            newValue.push(value[i]);  
          }
      }
    return newValue;
}




searchByCategory(op:any,categorieFilter:any):boolean{
  console.log(categorieFilter);
  let found = false;
  if(categorieFilter === 'all'){
    found = true;
  }else if(op.CategoryId == categorieFilter){  //Tiene al menos una categoria
     found = true;
    
  }
  return found;
}

searchByType(op:any,typeFilter:any):boolean{
  let found = false;
  if(typeFilter == 'all'){
    found = true;
  }else if(op.type == typeFilter){
    found = true;
  }
  return found;
 }

}


