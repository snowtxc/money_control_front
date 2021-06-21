import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';
import { IOperation } from 'src/app/interfaces/Operation.interface';
import { OperationService } from 'src/app/services/operations/operation.service';
import {CategoryService}  from 'src/app/services/category/category.service';

declare var $:any;
declare var M:any;

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css',
              './responsive.css']
})
export class OperationsComponent implements OnInit {

  public OPERATIONS: Array<IOperation> = [];
  public CATEGORIES:any = [];
  public CURRENT_BALANCE = 0;
  public errorMsg: string = '';


  //FORMS

  public editForm: FormGroup;
  public addForm: FormGroup;

  public submitedEditForm:boolean = false;
  public submitedAddForm: boolean = false;


  public selectedOpID: number = 0;
  public selectedOpType: string = '';
  public selectedOpConcept: string = '';
  public selectedOpAmount: number = 0;

  //Pagination
  public pageOfItemsOP:any = [];


  //Filter data
  public type:any = 'all';
  public categoryID:any = 'all';



  constructor(private _operationService:OperationService,private _builder:FormBuilder,private _categoryService:CategoryService) { 
    this.OPERATIONS = [];

    //Init forms
    this.addForm = this._builder.group({
      amount: ['',Validators.required],
      concept: ['', Validators.required],
      type:  ['', Validators.required]
    });

    this.editForm = this._builder.group({
      amount: ['', Validators.required],
      concept: ['', [Validators.required,Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.modal').modal();
    });

    $('.dropdown-trigger').dropdown();
    
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems);
    });



    //Evento filter
    this._operationService.currentDataFilterSubject.subscribe(data =>{
        this.type = data.type;
        this.categoryID = data.category;
    })

    this._categoryService.updateCategoriesSubject.subscribe(() =>{
      this.loadCategory();
    })

    this.loadOperations();  
    this.loadCategory();

  }

 

  loadOperations(){
    this._operationService.getOperations().subscribe(data =>{
      console.log(data);
      this.CURRENT_BALANCE = data.current_value;
      this.OPERATIONS = data.Operaciones; 
    },
    error =>{
      this.errorMsg = error;
    })

  }



  //FORMULARIO AGREGAR OPERACION


  onSubmitAddForm(){
  
    this.submitedAddForm = true;
    if (this.addForm.invalid) {
      return;
    }
    const amount  = this.addForm.controls['amount'].value;
    const concept = this.addForm.controls['concept'].value;
    const type = this.addForm.controls['type'].value;

   
    this._operationService.createOperation(amount,concept,type).subscribe((data) =>{
      $("#addModal").modal("close"); 
      M.toast({ html: 'Operation created succesfully'});
      this.loadOperations();
      this.addForm.reset();
      this.submitedAddForm = false;
    },
    error =>{
      console.log(error)
      this.errorMsg = error;
    }) 

  }


  //EDIT FORM

  loadDataEditForm(operation:any){  
    this.selectOp(operation);
    this.editForm = this._builder.group({
      amount: [this.selectedOpAmount, Validators.required],
      concept: [this.selectedOpConcept, Validators.required]
     });
  }
  
  onSubmitEditForm(){
    this.submitedEditForm = true;
    if(this.editForm.invalid){
      return;
    } 
    
    const amount = this.editForm.controls['amount'].value;
    const concept = this.editForm.controls['concept'].value;

    this._operationService.editOperation(this.selectedOpID,amount,concept).subscribe(data =>{
      M.toast({ html: 'Operation edited succesfully' }); 
      this.loadOperations();
    },
    error =>{
      this.errorMsg = error;  
    });

  }


  //DELETE FORM
  loadDataDeleteForm(operation:any){
    this.selectOp(operation);
  }

  onSubmitDeleteForm(){
    this._operationService.deleteOperation(this.selectedOpID).subscribe(data =>{
      M.toast({ html: data.msg });
      this.loadOperations();

    },
    error =>{
      this.errorMsg = error;
    })

  }


  selectOp(operation:any){
    this.selectedOpID = operation.id;
    this.selectedOpType = operation.type;
    this.selectedOpConcept = operation.concept;
    this.selectedOpAmount =  operation.amount;
  }
  
  

  //Cambio de pagination 
  onChangePage(pageOfItems: Array<any>){
    this.pageOfItemsOP = pageOfItems;
  }


  loadCategory(){
    this._categoryService.getCategories().subscribe((data) =>{
       this.CATEGORIES = data;
    })
    
  }


  associateCategory(idCategory:number){
    this._operationService.setCategory(this.selectedOpID,idCategory).subscribe(data =>{
      this.loadOperations();
      $("#asociateCategoryModal").modal("close");

    },
    error =>{
    console.log(error);
  })
  }



  quitCategory(idOp:number){
    
    this._operationService.setCategory(idOp,null).subscribe(data =>{
      this.loadOperations();
    },
    error =>{
      console.log(error);
    })
     

  }


  


}
