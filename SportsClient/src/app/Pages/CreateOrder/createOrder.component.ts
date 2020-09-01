import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { RestApiService } from '../../Services/rest.service';
import { LocalSateService } from 'src/app/Services/localSatet.service';
import { OrderModel } from 'src/app/Models/order.model';

@Component({
    selector: 'app-createorder',
    templateUrl: './createOrder.component.html'
})
export class CreateOrder implements OnInit {
    public UserList:any[];
    public order:OrderModel;
    public flag:boolean;
    public conf:string;
    constructor(private _api: RestApiService, private _router: Router,private state:LocalSateService) {
        this.UserList=[];
        this.order=new OrderModel();
        this.flag=false;
        this.conf="";
        if (sessionStorage.getItem("token") == null) {
            console.log("at ngoninit not log in");
            this._router.navigate(["/home"]);
        }
    }
    ngOnInit(): void {
        this._api.getUsers().subscribe((users)=>{
            users=JSON.parse(users)
            users.forEach(element => {
                var p:any;
                p=element["fields"];
                this.UserList.push(p["email"]);
            });
             
         });
    }
    Next():void{
        if(this.flag==false){
            this.order.totaldiscount="0";
            this.order.promocode="none"
        }
        this._api.applyPromoAndSave(this.order).subscribe((data)=>{
            this._router.navigate(["/orders"]);
        });
        
    }
    checkPromo(){
        if(100<parseInt(this.order.amount) && parseInt(this.order.amount)<150000){
                if(this.order.promocode!=null){
                    console.log("here");
                    this._api.CheckApplicablePromos(this.order).subscribe((data)=>{
                        if(data['valid']==true){
                            if(data['totalCount']==true){
                                if(data['count']==true){
                                    if(data['gender']==true){
                                        if(data['range']==true){
                                            this.order.totaldiscount=data['discount'];
                                            this.flag=true;
                                            this.conf="Promo code is applied"
                                            alert(this.conf);
                                        }
                                        else{
                                            this.flag=false;
                                            this.conf="Promo code is Expired"
                                            alert(this.conf);
                                        }
                                    }
                                    else{
                                        this.flag=false;
                                        this.conf="Promo code not applicable based on user's gender";
                                        alert(this.conf);
                                    }
                                }
                                else{
                                    this.flag=false;
                                    this.conf="Can not apply promo code. User limit is full."
                                    alert(this.conf);
                                }
                            }
                            else{
                                this.flag=false;
                                this.conf="Promo code limit reached.";
                                alert(this.conf);
                            }
                            
                        }
                        else{
                            this.flag=false;
                            this.conf="Promo code is not Valid";
                            alert(this.conf);
                        }
                    });
                }
                else{
                }
        }
        else{
            this.conf="please enter amount between 100 to 150000";
            alert(this.conf);
        }
    }
}