import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { LogInModel } from '../Models/logIn.model';
import { ResponseToken } from '../Models/responseToken.model';
import { ResponseBoolean } from '../Models/responseBoolean.model';
import { Register } from '../Models/register.model';
import {Promo} from '../models/promo.model';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest, HttpClient, HttpHeaders
} from '@angular/common/http';
import { OrderModel } from '../Models/order.model';
const endpoint = 'http://127.0.0.1:8000/api/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
@Injectable({
    providedIn: 'root'
})
export class RestApiService {
    public token: string;
    constructor(private http: HttpClient) {
    }
    postLogin(Data: LogInModel): Observable<ResponseToken> {
        return this.http.post<ResponseToken>(endpoint + "auth/login", {Email:Data.Username,Username:Data.Username,Password:Data.Password}, httpOptions);
    }
    register(register:Register):Observable<ResponseToken>{
        return this.http.post<ResponseToken>(endpoint + "auth/register", {email:register.username,username:register.username,password:register.password,birthdate:register.birthdate,gender:register.gender});
    }
    getPromos():Observable<any>{
        return this.http.get<any>(endpoint+'promo/get');
    }
    createPromo(promo:Promo):Observable<any>{
        return this.http.post<any>(endpoint+"promo/create",{promoCode:promo.promoCode,startDate:promo.startDate,endDate:promo.endDate,maxLimitUser:promo.maxLimitUser,maxPromo:promo.maxPromo,price:promo.price,gender:promo.gender})
    }
    editPromo(promo:Promo):Observable<any>{
        return this.http.post<any>(endpoint+"promo/update",{id:promo.id,promoCode:promo.promoCode,startDate:promo.startDate,endDate:promo.endDate,maxLimitUser:promo.maxLimitUser,maxPromo:promo.maxPromo,price:promo.price,gender:promo.gender})
    }
    deletePromo(promo:Promo):Observable<any>{
        return this.http.post<any>(endpoint+"promo/delete",{id:promo.id,promoCode:promo.promoCode,startDate:promo.startDate,endDate:promo.endDate,maxLimitUser:promo.maxLimitUser,maxPromo:promo.maxPromo,price:promo.price,gender:promo.gender})
    }
    getUsers():Observable<any>{
        return this.http.get<any>(endpoint+'auth/get');
    }
    CheckApplicablePromos(order:OrderModel):Observable<any>{
        return this.http.post<any>(endpoint+"order/check",{user_email:order.userid,promoCode:order.promocode})
    }
    applyPromoAndSave(order:OrderModel){
        return this.http.post<any>(endpoint+"order/create",{user_email:order.userid,usedPromo:order.promocode,amount:order.amount})
    }
    getAllOrders():Observable<any>{
        return this.http.get<any>(endpoint+'order/get');
    }
}