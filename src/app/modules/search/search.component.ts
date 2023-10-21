import { Component } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { City } from 'src/app/core/interfaces/city.interface';
import { Observable } from 'rxjs';
import {
  ForecastHour,
  Weather,
} from 'src/app/core/interfaces/weather.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
})
export class SearchComponent {
  // @Output() handleCityChange = new EventEmitter<City>();
  constructor(private weatherService: WeatherService) {}

  control = new FormControl<string>('');
  cities: City[] = [];
  options$!: Observable<City[]>;
  city!: City;
  weather!: Weather;
  forecast!: ForecastHour;
  temperature = 0;
  temperatureOneHour = 34;
  temperature12Hours = 0;
  temperatureTomorrow = 0;
  temperature5Days = 0;
  temperatureYesterday = 0;

  onEnter(): void {
    const value = this.control.value;
    if (value) {
      this.options$ = this.weatherService.getLocations(value);
      this.options$.subscribe((res) => (this.cities = res));
    }
  }

  onSelect(val: MatAutocompleteSelectedEvent): void {
    const value = val?.option?.value as string;
    const selectedCity = this.cities.find(
      (item) => item.LocalizedName == value
    );
    if (selectedCity) {
      this.city = selectedCity;
    }
    // console.log(this.city);
    this.getCurrentConditions();
    this.getConditionsIn1Hour();
    this.getConditionsIn12Hours();
    this.getConditionsForTomorrow();
    this.getConditionsIn5Days();
    this.getConditionsForYesterday();
  }

  getCurrentConditions() {
    this.weatherService
      .getCurrentConditions(this.city.Key)
      .subscribe((data) => {
        // if (data && data.length > 0) {
        // this.weather = data[0];
        this.temperature = data[0].Temperature.Metric.Value;
        // }
        console.log(this.temperature);
      });
  }

  getConditionsIn1Hour() {
    this.weatherService
      .getConditionsIn1Hour(this.city.Key)
      .subscribe((data) => {
        this.temperatureOneHour = data[0].Temperature.Value;
        console.log(this.temperatureOneHour);
      });
  }

  getConditionsIn12Hours() {
    this.weatherService
      .getConditionsIn12Hours(this.city.Key)
      .subscribe((data) => {
        this.temperature12Hours = data[11].Temperature.Value;
        console.log(this.temperature12Hours);
      });
  }

  getConditionsForTomorrow() {
    this.weatherService
      .getConditionsForTomorrow(this.city.Key)
      .subscribe((data) => {
        this.temperatureTomorrow =
          data.DailyForecasts[0].Temperature.Maximum.Value;
        console.log(data.DailyForecasts[0].Temperature.Maximum.Value);
      });
  }

  getConditionsIn5Days() {
    this.weatherService
      .getConditionsFor5Days(this.city.Key)
      .subscribe((data) => {
        this.temperature5Days =
          data.DailyForecasts[4].Temperature.Maximum.Value;
        console.log(data.DailyForecasts[4].Temperature.Maximum.Value);
      });
  }

  getConditionsForYesterday() {
    this.weatherService
      .getConditionsForYesterday(this.city.Key)
      .subscribe((data) => {
        this.temperatureYesterday = data[23].Temperature.Metric.Value;
        console.log(data[23].Temperature.Metric.Value);
      });
  }
}
