import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/weather/weather.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { UiService } from '../../services/ui/ui.service';
import { concatMap } from 'rxjs/operators';
import { TwitterService } from '../../services/twitter/twitter.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./styles/details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  public darkMode: boolean;
  public city: string;
  public state: string;
  public temp: number;
  public hum: number;
  public wind: number;
  public today: string;
  public daysForecast: Object;
  public cityIllustrationPath: string;
  public sub1: Subscription;
  public sub2: Subscription;
  public errorMessage: string;
  public tweets$: Observable<any>;

  constructor(public twitter: TwitterService, public activeRouter: ActivatedRoute, public weather: WeatherService, public ui: UiService) {
    
  }

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });
    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];
    this.sub2 = this.activeRouter.paramMap.pipe(concatMap((router: any) => {
      this.city = router.params.city;
      this.cityIllustrationPath = `../../../assets/cities/${this.city.toLowerCase()}.png`;
      return forkJoin(this.weather.getWeather(this.city), this.weather.getForecast(this.city)); // forkJoin() function - ??
    })).subscribe((payload) => {
      console.log(`Payload:\n${payload}`);
      this.state = payload[0].weather[0].main;
      this.temp = Math.ceil(Number(payload[0].main.temp)); // Math.ceil() - Math Library function ??
      this.hum = payload[0].main.humidity;
      this.wind = Math.round(Math.round(payload[0].wind.speed)); // Why we're using round() function twice ?
      const dates = {};
      for (const res of payload[1]) {
        const date = new Date(res.dt_txt).toDateString().split(' ')[0];
      }
    })
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}