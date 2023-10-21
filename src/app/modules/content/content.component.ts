// import { CommonModule } from '@angular/common';
// import {
//   ChangeDetectionStrategy,
//   Component,
//   OnInit,
//   inject,
// } from '@angular/core';
// import { BehaviorSubject, Observable, filter, map, switchMap } from 'rxjs';
// import { City } from 'src/app/core/interfaces/city.interface';
// import { Weather } from 'src/app/core/interfaces/weather.interface';
// import { WeatherService } from 'src/app/core/services/weather.service';
// import { SearchComponent } from 'src/app/modules/search/search.component';

// @Component({
//   selector: 'app-content',
//   standalone: true,
//   imports: [CommonModule, SearchComponent],
//   templateUrl: './content.component.html',
//   styleUrls: ['./content.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ContentComponent implements OnInit {
//   city$ = new BehaviorSubject<City | null>(null);
//   currentTemperature = 0;
//   temperature$!: Observable<number>;
//   weather!: Weather;

//   weatherService = inject(WeatherService);

//   ngOnInit(): void {
//     const dataSource = this.city$.asObservable().pipe(filter((res) => !!res));

//     this.temperature$ = dataSource.pipe(
//       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//       switchMap((res) => this.weatherService.getCurrentConditions(res!.Key)),
//       map((res) => res?.Temperature?.Metric?.Value),
//     );

//     console.log(dataSource);
//   }

//   handleCityChange(city: City): void {
//     this.city$.next(city);
//   }
// }
