import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { City } from 'src/app/models/city';
import { addCity, deselectCity, updateCity } from 'src/app/store/city/city.actions';
import { selectCity } from 'src/app/store/city/city.selector';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit {

  cityName = new FormControl('', [Validators.required]);
  city : City | null= null;
  
  constructor(private dialog: MatDialogRef<AddCityComponent>, private store: Store<AppState>) {}
  
  ngOnInit(): void {
    this.store.select(selectCity).subscribe((city) => {
      if(city) {
        this.city=city;
        this.cityName.setValue(this.city.city);
      }
    });
  };

  close() {
    this.deselectCity();
    this.dialog.close();
  };

  add() {
    if(this.city !== null) {
      if(this.cityName && this.cityName.value?.length) {
        const updatedCity: City = {
          id: this.city.id,
          city: this.cityName.value,
        };
        this.store.dispatch(updateCity({ city: updatedCity }));
      }
    } else {
      if(this.cityName && this.cityName.value?.length) {
        this.store.dispatch(addCity({ city: this.cityName.value }));
      }
    }
    this.close()
  };

  deselectCity() {
    this.city=null;
    this.store.dispatch(deselectCity());
  };
}
