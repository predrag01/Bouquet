import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { City } from 'src/app/models/city';
import { FloverShop } from 'src/app/models/store';
import { loadCities } from 'src/app/store/city/city.actions';
import { loadCityList } from 'src/app/store/city/city.selector';
import { deselectStore, updateShop } from 'src/app/store/flover-shop/flover-shop.actions';
import { selectStore } from 'src/app/store/flover-shop/flover-shop.selector';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss']
})
export class EditStoreComponent implements OnInit {
  
  constructor(private dialog: MatDialogRef<EditStoreComponent>, private store: Store<AppState>) {}

  shop: FloverShop | null =null;
  cities$: Observable<City[]>= of([]);
  selectedCity: City | null = null;

  name =new FormControl('', [Validators.required]);
  address =new FormControl('', [Validators.required]);
  email =new FormControl('', [Validators.required]);
  phone =new FormControl('', [Validators.required]);
  pib =new FormControl('', [Validators.required]);
  monFri =new FormControl('', [Validators.required]);
  saturday =new FormControl('', [Validators.required]);
  sunday =new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.store.select(selectStore).subscribe((shop) => {
      if(shop) {
        this.shop=shop;
        if(this.shop) {
          this.name.setValue(this.shop.name);
          this.selectedCity=this.shop.city;
          this.address.setValue(this.shop.address);
          this.email.setValue(this.shop.email);
          this.phone.setValue(this.shop.phone);
          this.pib.setValue(this.shop.pib);
          this.monFri.setValue(this.shop.monFri);
          this.saturday.setValue(this.shop.saturday);
          this.sunday.setValue(this.shop.sunday);
        }
      }
    });
    this.store.dispatch(loadCities());
    this.cities$= this.store.select(loadCityList);
  };

  close() {
    this.deselectCity();
    this.dialog.close();
  };

  deselectCity() {
    this.shop=null;
    this.store.dispatch(deselectStore());
  };

  save() {
    if((this.name.value !== this.shop?.name) || 
        (this.name.value !== this.shop?.name) ||
        (this.pib.value !== this.shop?.pib) ||
        (this.email.value !== this.shop?.email) ||
        (this.phone.value !== this.shop?.phone) ||
        (this.address.value !== this.shop?.address) ||
        (this.selectedCity !== this.shop?.city)||
        (this.monFri.value !== this.shop?.monFri) ||
        (this.saturday.value !== this.shop?.saturday) ||
        (this.sunday.value !== this.shop?.sunday)) {
          const updatedShop = {
            ...this.shop,
            name: this.name.value,
            city: this.selectedCity,
            address: this.address.value,
            email: this.email.value,
            phone: this.phone.value,
            pib: this.pib.value,
            monFri: this.monFri.value,
            saturday: this.saturday.value,
            sunday: this.sunday.value
          };

          this.store.dispatch(updateShop({ shop: <FloverShop>updatedShop }));
          this.close();
    }
  };

  onCitySelectionChange(event: any) {
    this.selectedCity=event.value;
  };
}
