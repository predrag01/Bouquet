import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FloverShop } from 'src/app/models/store';
import { addEmployee, loadOneStore, removeEmployee } from 'src/app/store/flover-shop/flover-shop.actions';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit {

  shopId!: number;
  shop: FloverShop | null =null;
  email=new FormControl('', [Validators.required]);


  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.shopId=params['id']));
    this.store.dispatch(loadOneStore({ id: this.shopId }));
    this.store.subscribe((state) => this.shop=state.shop.oneShop)
  };

  addEmployee() {
    this.store.dispatch(addEmployee({ email: <string>this.email.value, shopId: <number>this.shop?.id}));
  };

  removeEmployee(id: number){
    this.store.dispatch(removeEmployee({ userId: id, shopId: this.shopId}));
  }
}
