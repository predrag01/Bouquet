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
    console.log(bouquet.title)
    return this.httpClient.post<Bouquet>(environment.api + "/bouquet", bouquet);
  };
}
