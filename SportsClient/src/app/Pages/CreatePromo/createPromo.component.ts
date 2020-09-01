import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { RestApiService } from '../../Services/rest.service';
import { Promo } from 'src/app/models/promo.model';
import { LocalSateService } from 'src/app/Services/localSatet.service';

@Component({
    selector: 'app-createPromo',
    templateUrl: './createPromo.component.html'
})
export class CreatePromo implements OnInit {
    public promo: Promo;
    constructor(private _api: RestApiService, private _router: Router,private state:LocalSateService) {
        this.promo=new Promo();
        if (sessionStorage.getItem("token") == null) {
            console.log("at ngoninit not log in");
            this._router.navigate(["/home"]);
        }
    }
    ngOnInit(): void {
    }
    Create():void{
        if(this.promo.price==null || this.promo.gender==null|| this.promo.maxLimitUser||this.promo.startDate==null||this.promo.maxPromo==null||this.promo.endDate==null||this.promo.promoCode==null){
            alert("all field are mendetory");
        }
        else if(this.promo.promoCode != this.promo.promoCode.toUpperCase()){
            alert("please create code in capital letters");
        }
        else{
            this._api.getPromos().subscribe((promos)=>{
                var flag:boolean=true;
                promos=JSON.parse(promos)
                promos.forEach(element => {
                    var p:Promo=new Promo();
                    p=element["fields"];
                    if(this.promo.promoCode==p["promoCode"]){
                        flag=false;
                    }
                });
                if(flag){
                    this._api.createPromo(this.promo).subscribe((data)=>{
                        this._router.navigate(["/Dashboard"]);
                    });
                }
                else{
                    alert("Promo code exist with same name");
                }
            });
        }
    }
}