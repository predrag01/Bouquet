import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FloverShop, FloverShopDto } from '../models/store';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class FloverShopService {

  constructor(private httpClient: HttpClient) { }

  create(formData: FormData) {
    return this.httpClient.post<FloverShop>(environment.api + "/store", formData);
  };

  getMyStores( id: number) {
    return this.httpClient.get<FloverShop[]>(environment.api + "/store/" + id);
  };

  deleteStore(id : number) {
    return this.httpClient.delete<any>(environment.api + "/store/" + id);
  };

  updateShop(shop: FormData) {
    console.log(shop);
    return this.httpClient.put<FloverShop>(environment.api + "/store", shop);
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

  loadFloverStoresForHome(cityId: number){
    return this.httpClient.get<FloverShop[]>(environment.api + "/store/home/" + cityId);
  };

  loadAll(){
    return this.httpClient.get<FloverShop[]>(environment.api + "/store");
  };

  loadEmployeeStore(id: number){
    return this.httpClient.get<FloverShop>(environment.api + "/store/employee-store/" + id);
  }
}
