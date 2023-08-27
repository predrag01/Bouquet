import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { environment } from 'src/environments/environment';
import { Status } from '../enums/status';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getFilteredOrders(shopId: number, filter: Status) {
    return this.httpClient.get<Order[]>(environment.api + "/order/" + shopId, { params: { filter: filter.toString() } });
  };

  updateStatus(orderId: number, status: Status) {
    console.log(status);
    return this.httpClient.put<Order>(environment.api + "/order/update-status/" + orderId, { status: status });
  };
}
