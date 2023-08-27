import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Status } from 'src/app/enums/status';
import { Order } from 'src/app/models/order';
import { changeStatusToOrder, loadFilteredOrders } from 'src/app/store/order/order.actions';
import { loadOrders } from 'src/app/store/order/order.selector';

@Component({
  selector: 'app-store-orders',
  templateUrl: './store-orders.component.html',
  styleUrls: ['./store-orders.component.scss']
})
export class StoreOrdersComponent implements OnInit{

  shopId!: number;
  subtitle!: string;
  button!: string;
  orders$: Observable<Order[]> = of([]);

  constructor(private store: Store<AppState>, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.subtitle="Not accepted";
    this.button= "Accept";
    this.route.params.subscribe((params) => {
      this.shopId=params['id'];
      this.store.dispatch(loadFilteredOrders({ shopId: this.shopId, filter: Status.NotAccepted }));
      this.orders$= this.store.select(loadOrders);
    });
  };

  filter(filter: string) {
    if(filter === "notAccepted"){
      this.subtitle="Not accepted";
      this.button= "Accept";
      this.store.dispatch(loadFilteredOrders({ shopId: this.shopId, filter: Status.NotAccepted }));
    }else if(filter === "accepted"){
      this.subtitle="Accepted";
      this.button= "Ready to delivery";
      this.store.dispatch(loadFilteredOrders({ shopId: this.shopId, filter: Status.Accepted }));
    }else if(filter === "readyToDelivery"){
      this.subtitle="Ready to delivery";
      this.store.dispatch(loadFilteredOrders({ shopId: this.shopId, filter: Status.ReadyToDeliver }));
    }else {
      this.subtitle="Delivered";
      this.store.dispatch(loadFilteredOrders({ shopId: this.shopId, filter: Status.Delivered }));
    }
  };

  accept(orderId: number){
    console.log(orderId)
    this.store.dispatch(changeStatusToOrder({ orderId: orderId, status: Status.Accepted}));
  };
}
