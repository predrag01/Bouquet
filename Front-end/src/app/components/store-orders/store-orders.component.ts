import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-store-orders',
  templateUrl: './store-orders.component.html',
  styleUrls: ['./store-orders.component.scss']
})
export class StoreOrdersComponent implements OnInit{

  shopId!: number;

  constructor(private store: Store<AppState>, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.shopId=params['id'];
    });
  }
}
