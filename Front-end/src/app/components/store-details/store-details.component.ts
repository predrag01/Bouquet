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
import { deleteBouquet, loadBouquetListByStoreId, selectBouquet } from 'src/app/store/bouquet/bouquet.actions';
import { EditBouquetComponent } from '../edit-bouquet/edit-bouquet.component';
import { ShoppingCart, ShoppingCartDto } from 'src/app/models/shopping-cart';
import { addToCart } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { BouquetType } from 'src/app/models/bouquet-type';
import { loadTypes } from 'src/app/store/bouquet-type/bouquet-type.actions';
import { loadTypeList } from 'src/app/store/bouquet-type/bouquet-type.selector';
import { User } from 'src/app/models/user';
import { Roles } from 'src/app/enums/role';
import { environment } from 'src/environments/environment';

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
  types$: Observable<BouquetType[]> = of([]);
  selectedType: BouquetType | null=null;
  employer: Boolean = false;
  employee: Boolean = false;
  user: User | null =null;
  
  imgPath: string = environment.api;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>, private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.shopId=params['id'];
      this.store.dispatch(loadBouquetListByStoreId({ shopId: this.shopId }))
      
      this.store.dispatch(loadOneStore({ id: this.shopId }));
    });
    
    this.store.subscribe((state) => {
      this.shop=state.shop.oneShop;
      this.user = state.user.user;
      console.log("shop " + this.user?.employeed?.id)
      console.log("shop " + this.shop?.id)
      if(this.user?.role === Roles.Employer && this.user.id === this.shop?.owner.id)
      {
          this.employer=true;
      }else if( this.user?.employeed.id === this.shop?.id){
        this.employee=true;
      }
    });

    
    this.bouquets$= this.store.select(loadBouquetList);

    this.store.dispatch(loadTypes());
    this.types$=this.store.select(loadTypeList);
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

  edit(id: number) {
    this.store.dispatch(selectBouquet({ bouquetId: id }))
    this.dialog.open(EditBouquetComponent, {
      minWidth: '600px',
      minHeight: '400px'
    });
  };

  order(cart: ShoppingCartDto) {
    this.store.dispatch(addToCart({ order: cart }));
  };
 
  navigate(path: string) {
    this.router.navigate([ path ]);
  };

  onTypeSelectionChange(event: any) {
    if (event.value === 'all') {
      this.selectedType = null;
      this.store.select(loadBouquetList).subscribe(bouquets => {
        this.bouquets$ = of(bouquets);
      });
    } else {
      this.selectedType = event.value;
      this.store.select(loadBouquetList).subscribe(bouquets => {
        this.bouquets$ = of(bouquets.filter(bouquet => bouquet.bouquetType.id === this.selectedType?.id));
      });
    }
  };

  sortBouquets(sortType: 'lowToHigh' | 'highToLow') {
    this.bouquets$.subscribe(bouquets => {
        const sortedBouquets = [...bouquets];
        if (sortType === 'lowToHigh') {
            sortedBouquets.sort((a, b) => a.price - b.price);
        } else if (sortType === 'highToLow') {
            sortedBouquets.sort((a, b) => b.price - a.price);
        }
        this.bouquets$ = of(sortedBouquets);
    });
}
}
