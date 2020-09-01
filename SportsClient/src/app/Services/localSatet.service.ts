import { Injectable } from "@angular/core";
import { Promo } from '../models/promo.model';
import { OrderModel } from '../Models/order.model';

@Injectable({
    providedIn: 'root'
})
export class LocalSateService{
    setPromo(promo:Promo){
        sessionStorage.setItem("promo",JSON.stringify(promo))
    }
    getPromo():Promo{
        return JSON.parse(sessionStorage.getItem("promo"))
    }
    setOrder(order:OrderModel){
        sessionStorage.setItem("order",JSON.stringify(order))
    }
    getOrder():OrderModel{
        return JSON.parse(sessionStorage.getItem("order"))
    }
}