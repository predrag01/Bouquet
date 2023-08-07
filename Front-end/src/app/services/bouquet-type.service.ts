import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BouquetType } from '../models/bouquet-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BouquetTypeService {

  constructor(private httpClient: HttpClient) { }

  addType(type: string) {
    return this.httpClient.post<BouquetType>(environment.api + "/bouquet-type", {type});
  };

  getAll() {
    return this.httpClient.get<BouquetType[]>(environment.api + "/bouquet-type");
  };

  deleteType(id: number) {
    return this.httpClient.delete<any>(environment.api + "/bouquet-type/" + id);
  };

  updateType(bouquet: BouquetType){
    return this.httpClient.put<BouquetType>(environment.api + "/bouquet-type/", {...bouquet});
  };
}
