import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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

  imagePreview: string | null = null;
  selectedImage: File | null = null;
  selectedFileName: string | null = null;

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
    const formData = new FormData();

    formData.append('name', this.storeNameFormGroup.controls['storeNameCtrl'].value!);
    formData.append('address', this.storeInfoFormGroup.controls['addresCtrl'].value!);
    formData.append('email', this.storeInfoFormGroup.controls['emailCtrl'].value!);
    formData.append('phone', this.storeInfoFormGroup.controls['phoneCtrl'].value!);
    formData.append('picture', this.selectedImage!);
    formData.append('pib', this.storeInfoFormGroup.controls['pibCtrl'].value!);
    formData.append('monFri', this.storeWorkingTimeFormGroup.controls['mondFriCtrl'].value!);
    formData.append('saturday', this.storeWorkingTimeFormGroup.controls['saturdayCtrl'].value!);
    formData.append('sunday', this.storeWorkingTimeFormGroup.controls['saturdayCtrl'].value!);
    formData.append('cityId', String(this.selectedCity?.id));
    formData.append('ownerId', String(this.user?.id));

    this.store.dispatch(createShop({ formData: formData }));
    this.close();
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

  removeImg(value: string) {
    this.imagePreview= null;
    this.selectedFileName= null;
  };

}
