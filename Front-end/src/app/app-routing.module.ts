import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { BouquetTypeListComponent } from './components/bouquet-type-list/bouquet-type-list.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'city-list', component: CityListComponent},
  {path: 'bouquet-type-list', component: BouquetTypeListComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
