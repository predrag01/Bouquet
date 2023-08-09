import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStoreComponent } from '../add-store/add-store.component';

@Component({
  selector: 'app-my-stores',
  templateUrl: './my-stores.component.html',
  styleUrls: ['./my-stores.component.scss']
})
export class MyStoresComponent implements OnInit{

  constructor(private dialog: MatDialog){}

  ngOnInit(): void {
    
  }

  addStore() {
    this.dialog.open(AddStoreComponent, {
      minWidth: '400px',
      minHeight: ' 400px'
    });
  };


}
