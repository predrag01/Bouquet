import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Roles } from 'src/app/enums/role';
import { User } from 'src/app/models/user';
import { loadAllStores } from 'src/app/store/flover-shop/flover-shop.actions';
import { logout } from 'src/app/store/user/user.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  user: User | null=null;
  admin: Boolean= false;
  employer: Boolean= false;
  employee: Boolean= false;
  deliveryGuy: Boolean= false;
  imgPath: string = environment.api;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.user=state.user.user;
      if(this.user?.role === Roles.Admin)
      {
        this.admin=true;
      } else if(this.user?.role === Roles.Employer)
      {
        this.employer=true;
      }else if(this.user?.role === Roles.DeliveryGuy)
      {
        this.deliveryGuy=true;
      }else if(this.user?.role === Roles.Employee)
      {
        this.employee=true;
      }
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.admin=false;
    this.store.dispatch(logout());
    this.store.dispatch(loadAllStores());
  }
}
