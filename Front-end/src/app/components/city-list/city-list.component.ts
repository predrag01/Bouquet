import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { City } from 'src/app/models/city';
import { deleteCity, loadCities, selectCity } from 'src/app/store/city/city.actions';
import { loadCityList } from 'src/app/store/city/city.selector';
import { AddCityComponent } from '../add-city/add-city.component';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  cities$: Observable<City[]> = of([]);

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(loadCities());
    this.cities$= this.store.select(loadCityList);  
  };

  addCity() {
    this.dialog.open(AddCityComponent, {
      minWidth: '400px',
      minHeight: '200px'
    });
  };

  delete(id: number) {
    this.store.dispatch(deleteCity({ id }));
  };

  edit(id: number) {
    this.store.dispatch(selectCity({ id }));
    this.dialog.open(AddCityComponent, {
      minWidth: '400px',
      minHeight: '200px'
    });
  };

}
