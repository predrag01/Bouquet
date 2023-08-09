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
    console.log(formData.name);
    return this.httpClient.post<FloverShop>(environment.api + "/store", formData);
  };
}