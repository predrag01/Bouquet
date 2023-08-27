import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Status } from 'src/app/enums/status';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { acceptForDelivery, changeStatusToOrder, loadOrdersFilteredByDeliveryGug, loadOrdersReadyToDelivery } from 'src/app/store/order/order.actions';
import { loadOrders } from 'src/app/store/order/order.selector';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit{
  
  subtitle!: string;
  button!: string;
  orders$: Observable<Order[]> = of([]);
  user: User | null = null;

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.subscribe((state) => this.user= state.user.user);
    this.subtitle="Ready to delivery";
    this.button= "Accept";
    this.store.dispatch(loadOrdersReadyToDelivery());
    this.orders$= this.store.select(loadOrders);
  };

  filter(filter: string) {
    if(filter === "readyToDelivery"){
      this.subtitle="Ready to delivery";
      this.button= "Accept";
      this.store.dispatch(loadOrdersReadyToDelivery());
    }else if(filter === "acceptForDelivery"){
      this.subtitle="Accepted orders";
      this.button= "Delivered";
      this.store.dispatch(loadOrdersFilteredByDeliveryGug({ deliveryGuyId: <number>this.user?.id, status: Status.AcceptForDelivery}));
    }else{
      this.subtitle="Delivered";
      this.store.dispatch(loadOrdersFilteredByDeliveryGug({ deliveryGuyId: <number>this.user?.id, status: Status.Delivered}));
    }
  };

  changeStatus(orderId: number){
    if(this.button === "Accept"){
      this.store.dispatch(acceptForDelivery({ orderId: orderId, deliveryGuyId: <number>this.user?.id}));
    }else if(this.button === "Delivered"){
      this.store.dispatch(changeStatusToOrder({ orderId: orderId, status: Status.Delivered}));
    }
  };
}
