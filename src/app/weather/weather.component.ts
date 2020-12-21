import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(public weatherService: WeatherService, private dataService: DataService) { }

  locationInfo;
  message;
  wind = '--';
  feelslike = '--';
  rain = '--';
  pressure = '--';

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => {
      this.message = message;
      this.locationInfo = message;
      if (this.locationInfo.location) {
        this.wind = this.locationInfo.current.wind_kph;
        this.feelslike = this.locationInfo.current.feelslike_c;
        this.rain = this.locationInfo.current.precip_mm;
        this.pressure = this.locationInfo.current.pressure_mb;
      }
    });
  }

  newMessage(data) {
    this.dataService.changeMessage(data);
  }
}
