import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { RestApiService } from '../../Services/rest.service';
import { Promo } from 'src/app/models/promo.model';
import { LocalSateService } from 'src/app/Services/localSatet.service';

@Component({
    selector: 'app-EditPromo',
    templateUrl: './EditPromo.component.html'
})
export class EditPromo implements OnInit {
    public promo: Promo;
    constructor(private _api: RestApiService, private _router: Router,private state:LocalSateService) {
        this.promo=this.state.getPromo();
        console.log(this.promo);
        if (sessionStorage.getItem("token") == null) {
            console.log("at ngoninit not log in");
            this._router.navigate(["/home"]);
        }
    }
    ngOnInit(): void {
    }
    Edit():void{
        console.log(this.promo)
        this._api.editPromo(this.promo).subscribe((data)=>{
            this.state.setPromo(this.promo);
            this._router.navigate(["/detailPromo"]);
        });
    }
}