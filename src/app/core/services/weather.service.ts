import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { City } from '../interfaces/city.interface';
import { environment } from 'src/environments/environment.development';
import { Forecast, ForecastHour, Weather } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  API_KEY = 'apikey=U1xSGBSx0FYkoSfpwQnaIzvAVUlEEL73';
  base_url = 'http://dataservice.accuweather.com/';
  autocomplete_endpoint =
    'locations/v1/cities/autocomplete?' + this.API_KEY + '&q=';
  current_conditions_endpoint = 'currentconditions/v1/';
  one_hour_forecast_endpoint = "forecasts/v1/hourly/1hour/";
  twelve_hour_forecast_endpoint = "forecasts/v1/hourly/12hour/";
  tomorrow_endpoint = "forecasts/v1/daily/1day/";
  five_days_endpoint = "forecasts/v1/daily/5day/";
  yesterday_endpoint = "currentconditions/v1/";//      

  getLocations(q: string): Observable<City[]> {
    return this.http.get<City[]>(
      this.base_url + this.autocomplete_endpoint + q
    );
  }

  getCurrentConditions(cityKey: string) : Observable<Weather[]>{
    return this.http.get<Weather[]>(this.base_url+this.current_conditions_endpoint+cityKey+'?'+this.API_KEY);
  }

  getConditionsIn1Hour(cityKey: string) : Observable<ForecastHour[]> {
    return this.http.get<ForecastHour[]>(this.base_url+this.one_hour_forecast_endpoint+cityKey+'?'+this.API_KEY+"&metric=true")
  } 

  getConditionsIn12Hours(cityKey: string) : Observable<ForecastHour[]> {
    return this.http.get<ForecastHour[]>(this.base_url+this.twelve_hour_forecast_endpoint+cityKey+'?'+this.API_KEY+"&metric=true")
  }

  getConditionsForTomorrow(cityKey: string) : Observable<Forecast> {
    return this.http.get<Forecast>(this.base_url+this.tomorrow_endpoint+cityKey+'?'+this.API_KEY+"&metric=true")
  }

  getConditionsFor5Days(cityKey: string) : Observable<Forecast> {
    return this.http.get<Forecast>(this.base_url+this.five_days_endpoint+cityKey+'?'+this.API_KEY+"&metric=true")
  }

  getConditionsForYesterday(cityKey: string) : Observable<Weather[]> {
    return this.http.get<Weather[]>(this.base_url+this.yesterday_endpoint+cityKey+"/historical/24"+'?'+this.API_KEY)
  }
}
