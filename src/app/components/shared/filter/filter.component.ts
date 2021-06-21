import { Component, OnInit } from '@angular/core';
import { FormGroup ,Validators,FormBuilder} from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';

import { OperationService } from 'src/app/services/operations/operation.service';

declare var $:any;
declare var M:any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css',
              './responsive.css']
})
export class FilterComponent implements OnInit {

  public addCatForm: FormGroup;
  public submitedFormAddCat:boolean = false;
  public msgErrorForm: string = '';

  public categories:any = [];
  constructor(private _operationService:OperationService,private _categoryService:CategoryService,private _builder:FormBuilder) {
    this.addCatForm = this._builder.group({
      name: ['',Validators.required]
    })

   }
  


  ngOnInit(): void {
    this.loadCategories();
  }

  filtrar(){
    const typeOP = $('input:radio[name=group1]:checked').val();
    const categoryOP = $("#selectCategory").val();

    $("#addCat").modal();

    this._operationService.sendDataFilter({type: typeOP,category:categoryOP});
  }


  loadCategories(){
    this._categoryService.getCategories().subscribe(data =>{  this.categories =  data;   })
  }

  onSubmitAddCat(){
    this.submitedFormAddCat = true;

    if(this.addCatForm.invalid){
      return;
    }

    const nameCategory = this.addCatForm.controls['name'].value;
    this._categoryService.createCategory(nameCategory).subscribe(data =>{
      M.toast({ html: data.msg }); 
      $("#addCatModal").modal("close"); 
      this.loadCategories();
      this.addCatForm.reset();
      this._categoryService.emitEventUpdateCategories();
      
    },
    error =>{
      console.log(error);
    })

  }
}
