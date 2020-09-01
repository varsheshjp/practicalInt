import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { RestApiService } from '../../Services/rest.service';
import { LogInModel } from '../../Models/logIn.model';

@Component({
  selector: 'app-Log-In',
  templateUrl: './logInPage.component.html'
})
export class LogInComponent implements OnInit {
  title = 'Log In';
  public logIn: LogInModel;
  public Username: string;
  public Password: string;
  public error: string;
  constructor(private _api: RestApiService, private _router: Router) {
    this.logIn = new LogInModel();
    let token = sessionStorage.getItem("token");
    if (token != null) {
      this._router.navigate(['/Dashboard']);
    }
    this.error = "";
  }
  ngOnInit(): void {
  }
  public LogInButton() {
    if (this.logIn.Password == null || this.logIn.Password == "") {
      this.error = "Password and Username must not be empty";
    }
    else if (this.logIn.Username == null || this.logIn.Username == "") {
      this.error = "Password and Username must not be empty";
    }
    else {
      this._api.postLogin(this.logIn).subscribe((data) => {
        if (!data.login) {
          sessionStorage.setItem("token", null);
          this.error = "Invalid Username or Password";
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
}