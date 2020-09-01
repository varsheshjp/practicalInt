import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";

import { RestApiService } from '../../Services/rest.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Promo } from 'src/app/models/promo.model';
import { LocalSateService } from 'src/app/Services/localSatet.service';
@Component({
    selector: 'app-Dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    PromoList:Promo[];
    constructor( private _api: RestApiService, private _router: Router,private state:LocalSateService) {
        
        if (sessionStorage.getItem("token") == null) {
            console.log("at ngoninit not log in");
            this._router.navigate(["/home"]);
        }
       this.PromoList=[];
    }
    ngOnInit(): void {
         this._api.getPromos().subscribe((promos)=>{
            promos=JSON.parse(promos)
            promos.forEach(element => {
                var p:Promo=new Promo();
                p=element["fields"];
                p.id=element["pk"];
                console.log(p);
                this.PromoList.push(p);
            });
             
         });
    }
    CreatePromo(){
        this._router.navigate(["/createPromo"]);
    }
    ViewPromo(i:number){
        this.state.setPromo(this.PromoList[i]);
        this._router.navigate(['/detailPromo']);
    }
}