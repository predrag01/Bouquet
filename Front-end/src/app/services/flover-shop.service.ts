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
  }
}
