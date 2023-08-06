import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City, CityDto } from '../models/city';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<City[]>(environment.api + "/city");
  };

  addCity(city: string) {
    return this.httpClient.post<City>(environment.api + "/city", {city});
  };

  deleteCity(id: number) {
    return this.httpClient.delete<any>(environment.api + "/city/"+ id);
  };

  updateCity(city: City) {
    return this.httpClient.put<City>(environment.api + "/city", {...city});
  };
}
