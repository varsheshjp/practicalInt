import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { RestApiService } from '../../Services/rest.service';
import { Promo } from 'src/app/models/promo.model';
import { LocalSateService } from 'src/app/Services/localSatet.service';

@Component({
    selector: 'app-detailPromo',
    templateUrl: './promoDetail.component.html'
})
export class DetailPromo implements OnInit {
    public promo: Promo;
    public error:string;
    constructor(private _api: RestApiService, private _router: Router,private state:LocalSateService) {
        this.promo=this.state.getPromo();
        this.error="";
        if (sessionStorage.getItem("token") == null) {
            console.log("at ngoninit not log in");
            this._router.navigate(["/home"]);
        }
    }
    ngOnInit(): void {
    }
    Edit(){
        if(this.promo.usedPromo!='0'){
            this.error="can not delete or change because promo is already in use.";
            alert(this.error);
        }
        else{
            this._router.navigate(["/editPromo"]);
        }
    }
    Delete(){
        if(this.promo.usedPromo!='0'){
            this.error="can not delete or change because promo is already in use.";
            alert(this.error);
        }
        else{
            this._api.deletePromo(this.promo).subscribe((data)=>{
                this._router.navigate(["/Dashboard"]);
            })
        }
    }
}