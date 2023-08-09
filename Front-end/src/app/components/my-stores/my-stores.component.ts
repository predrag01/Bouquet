import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStoreComponent } from '../add-store/add-store.component';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { loadMyStoreList } from 'src/app/store/flover-shop/flover-shop.actions';
import { loadMyStores } from 'src/app/store/flover-shop/flover-shop.selector';
import { FloverShop } from 'src/app/models/store';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-my-stores',
  templateUrl: './my-stores.component.html',
  styleUrls: ['./my-stores.component.scss']
})
export class MyStoresComponent implements OnInit{

  constructor(private dialog: MatDialog, private store: Store<AppState>){}

  user: User | null= null;
  stores$: Observable<FloverShop[]> = of([]);

  ngOnInit(): void {
    this.store.subscribe((state) => this.user=state.user.user);
    this.store.dispatch(loadMyStoreList({ id: <number>this.user?.id}));
    this.stores$= this.store.select(loadMyStores);
  };

  addShop() {
    this.dialog.open(AddStoreComponent, {
      minWidth: '400px',
      minHeight: ' 400px'
    });
  };

  deleteShop(id : number) {
    
  }

}
