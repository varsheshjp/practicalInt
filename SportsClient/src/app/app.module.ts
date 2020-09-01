import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestApiService } from './Services/rest.service';
import { HttpClient } from "@angular/common/http";
import { LogInComponent } from './Pages/LogInPage/logInPage.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from './Pages/Dashboard/dashboard.component';
import { RegisterComponent } from './Pages/Registration/register.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiInterceptor } from './Interceptor/api.interceptor';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CreatePromo } from './Pages/CreatePromo/createPromo.component';
import { LocalSateService } from './Services/localSatet.service';
import { DetailPromo } from './Pages/PromoDetails/promoDetail.component';
import { EditPromo } from './Pages/EditPromo/editPromo.component';
import { Order } from './Pages/OrderPage/order.component';
import { CreateOrder } from './Pages/CreateOrder/createOrder.component';
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DashboardComponent,
    RegisterComponent,
    CreatePromo,
    DetailPromo,
    EditPromo,
    Order,
    CreateOrder
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
  ],
  providers: [RestApiService,HttpClient,LocalSateService,
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }