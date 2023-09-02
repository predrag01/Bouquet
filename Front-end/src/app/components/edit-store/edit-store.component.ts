import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
import { environment } from 'src/environments/environment';

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
  imgPath: string = environment.api;

  imagePreview: string | null = null;
  selectedImage: File | null = null;
  selectedFileName: string | null = null;

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
          if(this.shop.picture){
            this.imagePreview= this.shop.picture;
          }else {
            this.imagePreview= 'noImage.png';
          }
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
        (this.sunday.value !== this.shop?.sunday) ||
        this.selectedImage) {
          const formData = new FormData();

          formData.append('id', String(this.shop?.id));
          formData.append('name', this.name.value!);
          formData.append('cityId', String(this.selectedCity?.id));
          formData.append('address', this.address.value!);
          formData.append('email', this.email.value!);
          formData.append('phone', this.phone.value!);
          if(this.selectedImage){
            formData.append('picture', this.selectedImage!);
          }
          formData.append('pib', this.pib.value!);
          formData.append('monFri', this.monFri.value!);
          formData.append('saturday', this.saturday.value!);
          formData.append('sunday', this.sunday.value!);

          this.store.dispatch(updateShop({ shop: formData }));
          this.close();
     }
  };

  onCitySelectionChange(event: any) {
    this.selectedCity=event.value;
  };

  handleSelectedFile(event: any) {
    this.selectedImage = event.target.files[0];
    this.imagePreview = null;

    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }

    this.selectedFileName= <string>this.selectedImage?.name;
  };
}
