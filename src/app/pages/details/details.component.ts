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
  public daysForecast: any = [];
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
    this.sub2 = this.activeRouter.paramMap.pipe(concatMap((route: any) => {
      this.city = route.params.city;
      /*
      All the most interested capitals cities for binding new city illustrations:
      
      - Europe:

      1. Athens
      2. Doha
      3. London
      4. Oslo
      5. Amsterdam
      6. Paris
      7. Berlin
      8. Bern
      9. Tirana
      10. Vienna
      11. Minsk
      12. Kiev
      13. Moscow
      14. Brussels
      15. Sarajevo
      16. Sofia
      17. Zagreb
      18. Prague
      19. Warsaw
      20. Copenhagen
      21. Tallinn
      22. Helsinki
      23. Budapest
      24. Reykjavik
      25. Dublin
      26. Rome
      27. Riga
      28. Vaduz
      29. Vilnius
      30. Luxembourg
      31. Chisinau
      32. Valletta
      33. Monaco
      34. Lisbon
      35. Bucharest
      36. Belgrade
      37. Bratislava
      38. Madrid
      39. Stockholm
      40. Ankara

      - Asia:

      1. Beijing
      2. New Delphi
      3. Jerusalem
      4. Tokyo
      5. Nur-Sultan
      6. Kuala Lumpur
      7. Doha
      8. Seoul
      9. Abu Dhabi

      - Africa:

      1. Cairo
      2. Rabat
      3. Pretoria
      4. Tunis

      - North America:

      1. Ottawa
      2. Mexico City
      3. Washington, D.C

      - South America:

      1. Buenos Aires
      2. Brasilia
      3. Caracas

      - Australia & Oceania:

      1. Canberra
      2. Wellington

      */
      this.cityIllustrationPath = `../../../assets/details/${this.city.toLowerCase()}.png`;
      return forkJoin(this.weather.getWeather(this.city), this.weather.getForecast(this.city)); // forkJoin() function - ??
    })).subscribe((payload) => {
      this.state = payload[0].weather[0].main;
      this.temp = Math.ceil(Number(payload[0].main.temp)); // Math.ceil() - Math Library function ??
      this.hum = payload[0].main.humidity;
      this.wind = Math.round(Math.round(payload[0].wind.speed)); // Why we're using round() function twice ?
      const dates = {};
      for (const res of payload[1]) {
        const date = new Date(res.dt_txt).toDateString().split(' ')[0];
        if (dates[date]) {
          dates[date].counter += 1;
          dates[date].temp += res.main.temp;
        } else {
          dates[date] = {
            state: res.weather[0].main, 
            temp: res.main.temp,
            counter: 1
          };
        }
      }
      Object.keys(dates).forEach((day) => {
        dates[day].temp = Math.round(dates[day].temp / dates[day].counter);
      });
      delete dates[Object.keys(dates)[0]];
      Object.keys(dates).forEach((key) => {
        dates[key].day = key;
        this.daysForecast.push(dates[key]);
      });
    }, (err) => {
      this.errorMessage = err.error.message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2500);
    });
    this.tweets$ = this.twitter.fetchTweets(this.city);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}