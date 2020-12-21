import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Weather } from './interface/weather';

const BACKENDURL = environment.apiUrl;

@Injectable ({ providedIn: 'root' })

export class WeatherService {
  weatherInfo: Observable<Weather[]>;
  constructor(private httpClient: HttpClient) {   }
  getWeather(location) {
    const queryParam = '?location=' + location;
    return this.weatherInfo =  this.httpClient.get<Weather[]>(BACKENDURL + queryParam);
  }

}
