import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Bouquet } from 'src/app/models/bouquet';
import { BouquetType } from 'src/app/models/bouquet-type';
import { loadTypes } from 'src/app/store/bouquet-type/bouquet-type.actions';
import { loadTypeList } from 'src/app/store/bouquet-type/bouquet-type.selector';
import { deselectBouquet, updateBouquet } from 'src/app/store/bouquet/bouquet.actions';
import { selectBouquet } from 'src/app/store/bouquet/bouquet.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-bouquet',
  templateUrl: './edit-bouquet.component.html',
  styleUrls: ['./edit-bouquet.component.scss']
})
export class EditBouquetComponent implements OnInit {

  constructor(private dialog: MatDialogRef<EditBouquetComponent>, private store: Store<AppState>) {}

  bouquet: Bouquet | null = null;
  types$: Observable<BouquetType[]> = of([]);
  selectedType: BouquetType | null =null;

  imgPath: string = environment.api;
  imagePreview: string | null = null;
  selectedImage: File | null = null;
  selectedFileName: string | null = null;

  title =new FormControl('', [Validators.required]);
  description =new FormControl('', [Validators.required]);
  price =new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.store.select(selectBouquet).subscribe((bouquet) => {
      if(bouquet) {
        this.bouquet= bouquet;
        this.title.setValue(this.bouquet.title);
        this.selectedType=this.bouquet.bouquetType;
        this.description.setValue(this.bouquet.description);
        this.price.setValue(this.bouquet.price.toString());
        if(this.bouquet.image){
          this.imagePreview= this.bouquet.image;
        }else {
          this.imagePreview= 'noImage.png';
        }
      }
    });
    this.store.dispatch(loadTypes());
    this.types$=this.store.select(loadTypeList);
  };

  close() {
    this.deselectCity();
    this.dialog.close();
  };

  deselectCity() {
    this.bouquet=null;
    this.store.dispatch(deselectBouquet());
  };

  onCitySelectionChange(event: any) {
    this.selectedType= event.value;
  };

  save() {
    if((this.title.value !== this.bouquet?.title) || 
        (this.description.value !== this.bouquet?.description) ||
        (parseFloat(<string>this.price.value) !== this.bouquet?.price) ||
        (this.selectedType !== this.bouquet?.bouquetType) ||
        this.selectedImage) {
          const formData = new FormData();

          formData.append('id', String(this.bouquet?.id));
          formData.append('title', this.title.value!);
          formData.append('typeId', String(this.selectedType?.id));
          formData.append('description', this.description.value!);
          formData.append('price', String(this.price.value));
          if(this.selectedImage){
            formData.append('image', this.selectedImage!);
          }
          this.store.dispatch(updateBouquet({ bouquet: formData}));
          this.close();
     }
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
