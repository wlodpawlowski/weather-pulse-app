import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../../services/weather/weather.service';
import { FbService } from '../../services/fb/fb.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./styles/add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {

  public temp: number;
  public city: string = 'Oslo';
  public state: string;
  public capitals: any = [];
  public selectedCity: any;
  public cardCity: any;
  public showNote: boolean = false;
  public followedCM: boolean = false;
  public sub1: any;

  constructor(public http: HttpClient, public weather: WeatherService, public fb: FbService) { }

  ngOnInit() {
    this.weather.getWeather(this.city).subscribe((payload: any) => {
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));
    });

    this.http.get('https://restcountries.eu/rest/v2/all').pipe((first())).subscribe(
      (countries: Array<any>) => {
        countries.forEach((country: any) => {
          if (country.capital.length)
            this.capitals.push(country.capital);
        });
        this.capitals.sort();
    });

    this.sub1 = this.fb.getCities().subscribe((cities) => {
      Object.values(cities).forEach((city: any) => {
        if (city.name === 'Oslo')
          this.followedCM = true;
      });
    });
  }

  public selectCity(city: any): void {
    if (this.capitals.includes(city)) {
      this.cardCity = city;
      this.showNote = false;
    } else if (city.leading > 0) {
      this.showNote = true;
    }
  }

  public addCityOfTheMonth(): void {
    this.fb.addCity('Oslo').subscribe(() => {
      this.followedCM = true;
    })
  }
  
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
