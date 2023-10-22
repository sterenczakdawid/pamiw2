import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './modules/search/search.component';
import { WeatherComponent } from './modules/weather/weather.component';
// import { ContentComponent } from './modules/content/content.component';

@NgModule({
  declarations: [AppComponent, WeatherComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SearchComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
