import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { BouquetTypeListComponent } from './components/bouquet-type-list/bouquet-type-list.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MyStoresComponent } from './components/my-stores/my-stores.component';
import { StoreDetailsComponent } from './components/store-details/store-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { StoreOrdersComponent } from './components/store-orders/store-orders.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'city-list', component: CityListComponent},
  {path: 'bouquet-type-list', component: BouquetTypeListComponent},
  {path: 'edit-profile', component: EditProfileComponent},
  {path: 'my-stores', component: MyStoresComponent},
  {path: 'store-details/:id', component: StoreDetailsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'order-confirmation', component: OrderConfirmationComponent},
  {path: 'store-orders/:id', component: StoreOrdersComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
