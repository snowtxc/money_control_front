import { Type } from "@angular/core";

export class Operation{
    public id: number;
    public amount:number;
    public type:string;
    public concept: string;
    public createdAt:string;

    constructor(id:number,amount:number,type:string,concept:string, createdAt:string){
        this.amount = amount;
        this.type = type;
        this.concept = concept;
        this.createdAt = createdAt;
        this.id = id;

    }
}