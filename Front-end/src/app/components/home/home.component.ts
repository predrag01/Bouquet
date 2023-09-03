import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { FloverShop } from 'src/app/models/store';
import { User } from 'src/app/models/user';
import { loadAllStores, loadFloverShopForHome } from 'src/app/store/flover-shop/flover-shop.actions';
import { loadAllShopByCity } from 'src/app/store/flover-shop/flover-shop.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  user: User | null=null;
  stores$: Observable<FloverShop[]> = of([]);

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.subscribe((state) => this.user=state.user.user);
    if(this.user){
      this.store.dispatch(loadFloverShopForHome({ cityId: <number>this.user?.city.id }));
    }else {
      this.store.dispatch(loadAllStores());
    }
    this.stores$= this.store.select(loadAllShopByCity);
  };

  navigate(path: string) {
    this.router.navigate([ path ]);
  };

  floverShopDetails(shopId: number){
    this.router.navigate([ "store-details/" + shopId]);
  };
}
