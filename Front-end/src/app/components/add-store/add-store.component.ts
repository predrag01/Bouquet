import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { City } from 'src/app/models/city';
import { FloverShopDto } from 'src/app/models/store';
import { User } from 'src/app/models/user';
import { loadCities } from 'src/app/store/city/city.actions';
import { loadCityList } from 'src/app/store/city/city.selector';
import { createShop } from 'src/app/store/flover-shop/flover-shop.actions';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit{

  constructor(private formBuilder: FormBuilder, private dialog: MatDialogRef<AddStoreComponent>, private store: Store<AppState>) {}

  storeNameFormGroup = this.formBuilder.group({
    storeNameCtrl: ['', Validators.required],
  });
  storeInfoFormGroup = this.formBuilder.group({
    addresCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required],
    phoneCtrl: ['', Validators.required],
    pibCtrl: ['', Validators.required],
  });
  storeWorkingTimeFormGroup = this.formBuilder.group({
    mondFriCtrl: ['', Validators.required],
    saturdayCtrl: ['', Validators.required],
    sundayCtrl: ['', Validators.required],

  });

  isEditable = false;

  cities$: Observable<City[]> = of([]);
  selectedCity: City | null=null;

  user: User | null = null;

  ngOnInit(): void {
    this.store.dispatch(loadCities());
    this.cities$=this.store.select(loadCityList);
    this.store.subscribe((state) => this.user=state.user.user);
  };

  close() {
    this.dialog.close();
  };

  onCitySelectionChange(event: any) {
    this.selectedCity=event.value;
  };

  createStore() {
    const storeCreated= new FormData();

    const param: FloverShopDto = {
      name: this.storeNameFormGroup.controls['storeNameCtrl'].value!,
      address: this.storeInfoFormGroup.controls['addresCtrl'].value!,
      email: this.storeInfoFormGroup.controls['emailCtrl'].value!,
      phone: this.storeInfoFormGroup.controls['phoneCtrl'].value!,
      picture: "",
      pib: this.storeInfoFormGroup.controls['pibCtrl'].value!,
      monFri: this.storeWorkingTimeFormGroup.controls['mondFriCtrl'].value!,
      saturday: this.storeWorkingTimeFormGroup.controls['saturdayCtrl'].value!,
      sunday: this.storeWorkingTimeFormGroup.controls['saturdayCtrl'].value!,
      cityId: <number>this.selectedCity?.id,
      ownerId: <number>this.user?.id
    };

    // storeCreated.append('name', this.storeNameFormGroup.controls['storeNameCtrl'].value!);
    // storeCreated.append('address', this.storeInfoFormGroup.controls['addresCtrl'].value!);
    // storeCreated.append('email', this.storeInfoFormGroup.controls['emailCtrl'].value!);
    // storeCreated.append('phone', this.storeInfoFormGroup.controls['phoneCtrl'].value!);
    // storeCreated.append('picture', "");
    // storeCreated.append('pib', this.storeInfoFormGroup.controls['pibCtrl'].value!);
    // storeCreated.append('monFri', this.storeWorkingTimeFormGroup.controls['mondFriCtrl'].value!);
    // storeCreated.append('saturdy', this.storeWorkingTimeFormGroup.controls['saturdayCtrl'].value!);
    // storeCreated.append('sunday', this.storeWorkingTimeFormGroup.controls['sundayCtrl'].value!);
    // storeCreated.append('cityId', <string>this.selectedCity?.id.toString());
    //storeCreated.append('ownerId', <string>this.user?.id.toString());

    this.store.dispatch(createShop({ formData: param }));
  };
}
