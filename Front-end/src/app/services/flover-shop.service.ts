import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FloverShop, FloverShopDto } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class FloverShopService {

  constructor(private httpClient: HttpClient) { }

  create(formData: FloverShopDto) {
    return this.httpClient.post<FloverShop>(environment.api + "/store", formData);
  };

  getMyStores( id: number) {
    return this.httpClient.get<FloverShop[]>(environment.api + "/store/" + id);
  };

  deleteStore(id : number) {
    return this.httpClient.delete<any>(environment.api + "/store/" + id);
  };

  updateShop(shop: FloverShop) {
    return this.httpClient.put<FloverShop>(environment.api + "/store", {...shop});
  };

  loadOneShop(id: number) {
    return this.httpClient.get<FloverShop>(environment.api + "/store/getStore/" + id);
  };

  addEmployee(email: string, shopId: number) {
    const data = { email: email };
    return this.httpClient.put<any>(environment.api + "/store/addEmployee/" + shopId, data);
  };

  removeEmployee(userId: number, shopId: number) {
    const data = { userId: userId };
    return this.httpClient.put<FloverShop>(environment.api + "/store/removeEmployee/" + shopId, data);
  };
}
