import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { RestApiService } from '../../Services/rest.service';
import { LocalSateService } from 'src/app/Services/localSatet.service';
import { OrderModel } from 'src/app/Models/order.model';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html'
})
export class Order implements OnInit {
    public OrderList:OrderModel[];
    constructor(private _api: RestApiService, private _router: Router,private state:LocalSateService) {
        this.OrderList=[];
        if (sessionStorage.getItem("token") == null) {
            console.log("at ngoninit not log in");
            this._router.navigate(["/home"]);
        }
    }
    ngOnInit(): void {
        this._api.getAllOrders().subscribe((data)=>{
            data=JSON.parse(data)
            data.forEach(element => {
                var p:OrderModel=new OrderModel();
                p.amount=element["fields"]['amount'];
                p.promocode=element["fields"]['usedPromo'];
                p.totaldiscount=element["fields"]["totalDiscount"];
                p.userid=element["fields"]["user_email"];
                p.checkoutamount=(parseInt(p.amount)*(100-parseInt(p.totaldiscount))/100).toString();
                console.log(p);
                this.OrderList.push(p);
            });
        });
    }
    CreateOrder():void{
        this._router.navigate(['/createOrder']);
    }
}