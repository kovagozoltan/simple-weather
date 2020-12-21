import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService, private sanitizer: DomSanitizer) { }

  message;
  temp;
  backgroundImage;
  backgroundColor;
  colorArray = {
    // tslint:disable-next-line: max-line-length
    blue: 'url(../assets/img/searchBackgrounds/hills-blue.svg)',
    // tslint:disable-next-line: max-line-length
    green: 'url(../assets/img/searchBackgrounds/hills-green.svg)',
    // tslint:disable-next-line: max-line-length
    lightBlue: 'url(../assets/img/searchBackgrounds/hills-light-blue.svg)',
    // tslint:disable-next-line: max-line-length
    orange: 'url(../assets/img/searchBackgrounds/hills-orange.svg)',
    // tslint:disable-next-line: max-line-length
    red: 'url(../assets/img/searchBackgrounds/hills-red.svg)'
  };

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => {
      this.message = message;
      if (this.message[Object.keys(this.message)[0]]) {
        this.temp = this.message[Object.keys(this.message)[1]];
        this.temp = parseInt(this.temp.temp_c);
        if (this.temp < 0) {
          this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(this.colorArray.lightBlue);
          this.backgroundColor = 'rgb(168 227 250)';
        }
        if (this.temp > 0 && this.temp <= 10) {
          this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(this.colorArray.blue);
          this.backgroundColor = 'rgb(180 181 216)';
        }
        if (this.temp > 10 && this.temp <= 20) {
          this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(this.colorArray.green);
          this.backgroundColor = 'rgb(152 198 173)';
        }
        if (this.temp > 20 && this.temp <= 30) {
          this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(this.colorArray.orange);
          this.backgroundColor = 'rgb(249, 172, 176)';
        }
        if (this.temp > 30) {
          this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(this.colorArray.red);
          this.backgroundColor = 'rgb(249, 172, 176)';
        }
      }
    });
  }
}
