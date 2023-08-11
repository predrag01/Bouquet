import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bouquet, BouquetDto } from '../models/bouquet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BouquetService {

  constructor(private httpClient: HttpClient) { }

  addBouquet(bouquet: BouquetDto) {
    return this.httpClient.post<Bouquet>(environment.api + "/bouquet", bouquet);
  };

  getBouquetListByStoreId(shopId: number) {
    return this.httpClient.get<Bouquet[]>(environment.api + "/bouquet/"+shopId);
  };

  deleteBouquet(bouquetId: number) {
    console.log(bouquetId)
    return this.httpClient.delete<any>(environment.api + "/bouquet/" + bouquetId);
  };
}
