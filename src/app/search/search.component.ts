import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [WeatherService]
})
export class SearchComponent implements OnInit {

  constructor(public weatherService: WeatherService, private dataService: DataService) {}

  locationToSearch: any; // location value from the input
  locationInfo; // this will hold data recieved from the api
  message;
  currentLocation;
  currentCondition;
  currentTemp;

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message =>{
      this.message = message;
    })
  }

  searchLocation(form: NgForm) {
  // location = value from the search input
    const location = form.value.locationToSearch;
    // if we have a location value
    if (location) {
      // send location to get weather function from weather service
      this.weatherService.getWeather(location)
      this.weatherService.weatherInfo.subscribe(data => {
        this.locationInfo = data;
        this.currentLocation = this.locationInfo.location.name;
        this.currentCondition = this.locationInfo.current.condition.text;
        this.currentTemp = this.locationInfo.current.temp_c;
        this.newMessage(this.locationInfo)
      });
      this.locationToSearch = '';
    }

  }

  newMessage(data){
    this.dataService.changeMessage(data)
  }
}
