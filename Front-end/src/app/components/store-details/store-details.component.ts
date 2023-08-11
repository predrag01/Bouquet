import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FloverShop } from 'src/app/models/store';
import { addEmployee, loadOneStore, removeEmployee } from 'src/app/store/flover-shop/flover-shop.actions';
import { AddBouquetComponent } from '../add-bouquet/add-bouquet.component';
import { Observable, of } from 'rxjs';
import { Bouquet } from 'src/app/models/bouquet';
import { loadBouquetList } from 'src/app/store/bouquet/bouquet.selector';
import { deleteBouquet, loadBouquetListByStoreId } from 'src/app/store/bouquet/bouquet.actions';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit {

  shopId!: number;
  shop: FloverShop | null =null;
  email=new FormControl('', [Validators.required]);
  bouquets$: Observable<Bouquet[]>= of([]);


  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>, private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.shopId=params['id'];
      this.store.dispatch(loadBouquetListByStoreId({ shopId: this.shopId }))
    });
    this.store.dispatch(loadOneStore({ id: this.shopId }));
    this.store.subscribe((state) => this.shop=state.shop.oneShop);
    this.bouquets$= this.store.select(loadBouquetList);
  };

  addEmployee() {
    this.store.dispatch(addEmployee({ email: <string>this.email.value, shopId: <number>this.shop?.id}));
    this.email.setValue("");
  };

  removeEmployee(id: number){
    this.store.dispatch(removeEmployee({ userId: id, shopId: this.shopId}));
  };

  addBouquet() {
    this.dialog.open(AddBouquetComponent, {
      minWidth: '600px',
      minHeight: '400px'
    });
  };

  delete(id: number) {
    this.store.dispatch(deleteBouquet({ bouquetId: id }));
  };
}
