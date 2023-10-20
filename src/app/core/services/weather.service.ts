import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../interfaces/city';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  API_KEY = 'apikey=U1xSGBSx0FYkoSfpwQnaIzvAVUlEEL73';
  base_url = 'http://dataservice.accuweather.com/';
  autocomplete_endpoint = 'locations/v1/cities/autocomplete?' + this.API_KEY + '&q=';

  getLocations(q: string): Observable<City[]> {
    return this.http.get<City[]>(this.base_url + this.autocomplete_endpoint + q);
  }
}
