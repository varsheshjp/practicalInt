import { Component } from '@angular/core';
import { RestApiService } from './Services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SportsClient';
  constructor( private _api: RestApiService, private _router: Router) {
    
  }
  Logout() {
    sessionStorage.removeItem("token");
    this._router.navigate(["/home"]);
  }
  isLoggedIn(){
    const token: string = sessionStorage.getItem('token');
    if (token) {return true;}
    else{return false;}
  }
}
