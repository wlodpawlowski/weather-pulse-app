import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { WeatherService } from '../../services/weather/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./styles/details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public city: string;
  public state: string;
  public temp: number;
  public hum: number;
  public wind: number;

  public today: string;

  public day1Name: string;
  public day1State: string;
  public day1Temp: number;

  public day2Name: string;
  public day2State: string;
  public day2Temp: number;

  public day3Name: string;
  public day3State: string;
  public day3Temp: number;

  public day4Name: string;
  public day4State: string;
  public day4Temp: number;

  public day5Name: string;
  public day5State: string;
  public day5Temp: number;

  public sub1: Subscription;
  public sub2: Subscription;
  public sub3: Subscription;
  public sub4: Subscription;
  public sub5: Subscription;

  constructor(public activeRouter: ActivatedRoute, public weather /*:WeatherService*/) { }

    ngOnInit() {
      const todayNumberInWeek = new Date().getDay();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      this.today = days[todayNumberInWeek];

      this.activeRouter.paramMap.subscribe((route: any) => {
        this.city = route.params.city;
        this.sub1 = this.weather.getWeatherState(this.city).subscribe((state) => this.state = state);
        this.sub2 = this.weather.getCurrentTemp(this.city).subscribe((temperature) => this.temp = temperature);
        this.sub3 = this.weather.getCurrentHum(this.city).subscribe((humidity) => this.hum = humidity);
        this.sub4 = this.weather.getCurrentWind(this.city).subscribe((windspeed) => this.wind = windspeed);
        this.sub5 = this.weather.getForecast(this.city).subscribe((data: any) => {
          console.log('Data from the weather forecast:');
          console.log(data);
          for(let i = 0; i < data.length; i++) {
            const date = new Date(data[i].dt_txt).getDay();
            console.log('Day:');
            console.log(days[date]);
            if (((date === todayNumberInWeek + 1) || (todayNumberInWeek === 6 && date === 0)) && !this.day1Name) {
              this.day1Name = days[date];
              this.day1State = data[i].weather[0].main;
              this.day1Temp = Math.round(data[i].main.temp);
            } else if (!!this.day1Name && !this.day2Name && days[date] !== this.day1Name) {
              this.day2Name = days[date];
              this.day2State = data[i].weather[0].main;
              this.day2Temp = Math.round(data[i].main.temp);
            } else if (!!this.day2Name && !this.day3Name && days[date] !== this.day2Name) {
              this.day3Name = days[date];
              this.day3State = data[i].weather[0].main;
              this.day3Temp = Math.round(data[i].main.temp);
            } else if (!!this.day3Name && !this.day4Name && days[date] !== this.day3Name) {
              this.day4Name = days[date];
              this.day4State = data[i].weather[0].main;
              this.day4Temp = Math.round(data[i].main.temp);
            } else if (!!this.day4Name && !this.day5Name && days[date] !== this.day4Name) {
              this.day5Name = days[date];
              this.day5State = data[i].weather[0].main;
              this.day5Temp = Math.round(data[i].main.temp);
            }
          }
        });
      });
    }

    ngOnDestroy() {
      this.sub1.unsubscribe();
      this.sub2.unsubscribe();
      this.sub3.unsubscribe();
      this.sub4.unsubscribe();
      this.sub5.unsubscribe();
    }
}