import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { RestApiService } from '../../Services/rest.service';
import { Register } from '../../Models/register.model';

@Component({
    selector: 'app-Register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    public register: Register;
    constructor(private _api: RestApiService, private _router: Router) {
        this.register = new Register();
    }
    ngOnInit(): void {
        
    }
    Register() {
        this._api.register(this.register).subscribe((data) => {
            if (!data.login) {
                sessionStorage.setItem("token", null);
                console.log("fail");
            }
            else if (data.login) {
                sessionStorage.setItem("token", data.token);
                console.log(data.token);
                this._router.navigate(['/Dashboard']);
            }
        });
    }
}