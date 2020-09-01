import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './Pages/LogInPage/logInPage.component';
import { DashboardComponent } from './Pages/Dashboard/dashboard.component';
import { RegisterComponent } from './Pages/Registration/register.component';
import { CreatePromo } from './Pages/CreatePromo/createPromo.component';
import { DetailPromo } from './Pages/PromoDetails/promoDetail.component';
import { EditPromo } from './Pages/EditPromo/editPromo.component';
import { Order } from './Pages/OrderPage/order.component';
import { CreateOrder } from './Pages/CreateOrder/createOrder.component';
const routes: Routes = [
  {path:'home',component :LogInComponent},
  {path:'',redirectTo:'home',pathMatch: "full"},
  {path:'Dashboard',component : DashboardComponent},
  {path:'Register',component:RegisterComponent},
  {path:'createPromo',component:CreatePromo},
  {path:'detailPromo',component:DetailPromo},
  {path:'editPromo',component:EditPromo},
  {path:'orders',component:Order},
  {path:'createOrder',component:CreateOrder}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
