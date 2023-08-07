import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { BouquetType } from 'src/app/models/bouquet-type';
import { AddBouquetTypeComponent } from '../add-bouquet-type/add-bouquet-type.component';
import { deleteType, loadTypes, selectType } from 'src/app/store/bouquet-type/bouquet-type.actions';
import { loadTypeList } from 'src/app/store/bouquet-type/bouquet-type.selector';


@Component({
  selector: 'app-bouquet-type-list',
  templateUrl: './bouquet-type-list.component.html',
  styleUrls: ['./bouquet-type-list.component.scss']
})
export class BouquetTypeListComponent implements OnInit {

  types$: Observable<BouquetType[]> = of([]);

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit() {
    this.store.dispatch(loadTypes());
    this.types$=this.store.select(loadTypeList);
  };

  addtype() {
    this.dialog.open(AddBouquetTypeComponent, {
      minWidth: '400px',
      minHeight: '200px'
    });
  };

  delete(id: number) {
    this.store.dispatch(deleteType({ id }));
  };
  
  edit(id: number) {
    this.store.dispatch(selectType({ id }));
    this.dialog.open(AddBouquetTypeComponent, {
      minWidth: '400px',
      minHeight: '200px'
    });
  };
}
