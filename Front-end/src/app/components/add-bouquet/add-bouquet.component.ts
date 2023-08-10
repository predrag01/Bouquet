import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { BouquetDto } from 'src/app/models/bouquet';
import { BouquetType } from 'src/app/models/bouquet-type';
import { FloverShop } from 'src/app/models/store';
import { loadTypes } from 'src/app/store/bouquet-type/bouquet-type.actions';
import { loadTypeList } from 'src/app/store/bouquet-type/bouquet-type.selector';
import { addBouquet } from 'src/app/store/bouquet/bouquet.actions';

@Component({
  selector: 'app-add-bouquet',
  templateUrl: './add-bouquet.component.html',
  styleUrls: ['./add-bouquet.component.scss']
})
export class AddBouquetComponent implements OnInit{

  constructor(private formBuilder: FormBuilder, private dialog: MatDialogRef<AddBouquetComponent>, private store: Store<AppState>) {}
  
  infoFormGroup = this.formBuilder.group({
    titleCtrl: ['', Validators.required],
    descriptionCtrl: ['', Validators.required],
    priceCtrl: ['', Validators.required],
  });

  isEditable = false;

  types$: Observable<BouquetType[]> = of([]);
  selectedType: BouquetType | null=null;

  shop: FloverShop | null = null;

  ngOnInit(): void {
    this.store.dispatch(loadTypes());
    this.types$=this.store.select(loadTypeList);
    this.store.subscribe((state) => this.shop=state.shop.oneShop);
  };

  close() {
    this.dialog.close();
  };

  onCitySelectionChange(event: any) {
    this.selectedType= event.value;
  };

  createBouquet() {
    const bouquet: BouquetDto = {
      title: this.infoFormGroup.controls['titleCtrl'].value!,
      image: "",
      description: this.infoFormGroup.controls['descriptionCtrl'].value!,
      price: parseFloat(this.infoFormGroup.controls['priceCtrl'].value!),
      typeId: <number>this.selectedType?.id,
      storeId: <number>this.shop?.id
    };

    this.store.dispatch(addBouquet({ bouquet: bouquet }));
    this.close();
  };

}
