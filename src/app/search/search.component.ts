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

  constructor(public weatherService: WeatherService, private dataService: DataService) { }

  locationToSearch: any; // location value from the input
  locationInfo; // this will hold data recieved from the api
  location;
  message;
  currentLocation;
  currentCondition;
  currentTemp;

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => {
      this.message = message;
    })
    // get location value from local storage
    this.location = localStorage.getItem('simpleWeatherLocation')
    // if we have location get weather
    if( this.location ){
      this.getWeather()
    }
  }

  searchLocation(form: NgForm) {
    // location = value from the search input
    this.location = form.value.locationToSearch;
    // get weather
    this.getWeather()
  }

  getWeather(){
    // if we have location
    if (this.location) {
      // send location to get weather function from weather service
      this.weatherService.getWeather(this.location)
      this.weatherService.weatherInfo.subscribe(data => {
        // we get back data from api
        this.locationInfo = data;
        this.currentLocation = this.locationInfo.location.name;
        this.currentCondition = this.locationInfo.current.condition.text;
        this.currentTemp = this.locationInfo.current.temp_c;
        // send the data recieved from api to the weather using the data service
        this.newMessage(this.locationInfo)
      });
      // save location to local storage
      localStorage.setItem('simpleWeatherLocation', this.location)
      this.locationToSearch = '';
    }
  }

  newMessage(data) {
    this.dataService.changeMessage(data)
  }
}
