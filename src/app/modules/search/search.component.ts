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

import { City } from 'src/app/core/interfaces/city';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  tap,
} from 'rxjs';

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
export class SearchComponent /*implements OnInit*/ {
  // city = '';
  // cities: City[] = [];

  // @Output() handleCityChange = new EventEmitter<City>();
  constructor(private weatherService: WeatherService) {}

  // onSubmit() {
  //   // console.log('city to ' + this.city);
  //   this.weatherService.getLocations(this.city).subscribe((locations) => {
  //     this.cities = locations.map((location: any) => {
  //       return {
  //         Key: location.Key,
  //         LocalizedName: location.LocalizedName,
  //       };
  //     });
  //     console.log(this.cities);
  //   });
  //   this.city = '';
  // }

  control = new FormControl<string>('');
  cities: City[] = [];

  options$!: Observable<City[]>;

  onEnter(): void {
    const value = this.control.value;
    if (value) {
      this.options$ = this.weatherService.getLocations(value);
      this.options$.subscribe((res) => (this.cities = res));
    }
  }

  onSelect(val: MatAutocompleteSelectedEvent): void {
    const value = val?.option?.value as string;
    // this.handleCityChange.emit(this.cities.find((item) => item.LocalizedName == value));
    console.log(value);
  }

}
