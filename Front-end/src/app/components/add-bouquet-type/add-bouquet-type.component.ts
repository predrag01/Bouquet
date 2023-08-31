import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { BouquetType } from 'src/app/models/bouquet-type';
import { addtype, deselectType, updateType } from 'src/app/store/bouquet-type/bouquet-type.actions';
import { selectType } from 'src/app/store/bouquet-type/bouquet-type.selector';

@Component({
  selector: 'app-add-bouquet-type',
  templateUrl: './add-bouquet-type.component.html',
  styleUrls: ['./add-bouquet-type.component.scss']
})
export class AddBouquetTypeComponent implements OnInit {

  bouquetType = new FormControl('', [Validators.required]);
  type : BouquetType | null= null;
  
  constructor(private dialog: MatDialogRef<AddBouquetTypeComponent>, private store: Store<AppState>) {}
  
  ngOnInit(): void {
    this.store.select(selectType).subscribe((type) => {
      if(type) {
        this.type=type;
        this.bouquetType.setValue(this.type.type);
      }
    });
  };

  close() {
    this.deselectCity();
    this.dialog.close();
  };

  add() {
    if(this.type !== null) {
      if(this.bouquetType && this.bouquetType.value?.length) {
        const updatedtype: BouquetType = {
          id: this.type.id,
          type: this.bouquetType.value,
        };
        this.store.dispatch(updateType({ bouquetType: updatedtype }));
      }
    } else {
      if(this.bouquetType && this.bouquetType.value?.length) {
        this.store.dispatch(addtype({ bouquetType: this.bouquetType.value }));
      }
    }
    this.close()
  };

  deselectCity() {
    this.type=null;
    this.store.dispatch(deselectType());
  };
}