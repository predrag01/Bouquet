import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStoreComponent } from '../add-store/add-store.component';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { deleteStore, loadEmployeeStore, loadMyStoreList, selectStore } from 'src/app/store/flover-shop/flover-shop.actions';
import { loadEmployedStore, loadMyStores } from 'src/app/store/flover-shop/flover-shop.selector';
import { FloverShop } from 'src/app/models/store';
import { Observable, of } from 'rxjs';
import { EditStoreComponent } from '../edit-store/edit-store.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Roles } from 'src/app/enums/role';

@Component({
  selector: 'app-my-stores',
  templateUrl: './my-stores.component.html',
  styleUrls: ['./my-stores.component.scss']
})
export class MyStoresComponent implements OnInit{

  constructor(private dialog: MatDialog, private store: Store<AppState>, private router: Router){}

  user: User | null= null;
  stores$: Observable<FloverShop[]> = of([]);
  store$: Observable<FloverShop | null> = of();
  imgPath: string = environment.api;
  employee: Boolean= false;

  ngOnInit(): void {
    this.store.subscribe((state) => this.user=state.user.user);
    if(this.user?.role === Roles.Employer){
      this.store.dispatch(loadMyStoreList({ id: <number>this.user?.id}));
      this.stores$= this.store.select(loadMyStores);
    }else {
      this.store.dispatch(loadEmployeeStore({ id: <number>this.user?.id}));
      this.store$= this.store.select(loadEmployedStore);
    }
    if(this.user?.role === Roles.Employee){
      this.employee=true;
    }
  };

  addShop() {
    this.dialog.open(AddStoreComponent, {
      minWidth: '400px',
      minHeight: ' 400px'
    });
  };

  editShop(id: number) {
    this.store.dispatch(selectStore({ id }));
    this.dialog.open(EditStoreComponent, {
      minWidth: '400px',
      minHeight: ' 400px'
    })
  }

  deleteShop(id : number) {
    this.store.dispatch(deleteStore({ id }));
  };

  navigate(path: string) {
    this.router.navigate([ path ]);
  }

}
