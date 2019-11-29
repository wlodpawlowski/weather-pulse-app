import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class WeatherService {
  
  constructor(public http: HttpClient) {
  }

  // Service method for fetching forecast data of the specific city:
  public getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const dataSub: any = new Subject<string>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((data) => {
        dataSub(data['weather']);
      }, (err) => {
        console.error(err);
      });
      return dataSub;
  }

  // Service method for fetching forecast data of a specific list with cities:
  public getCitiesWeatherByNames(cities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
    const citiesSubject = new Subject();
    cities.forEach((city) => {
      citiesSubject.next(this.http.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=APPID=952d6b1a52fe15a7b901720074680562`));
    });
    return citiesSubject;
  }

  // Service method for fetching the current weather state:
  public getWeatherState(city: string): Subject<string> {
    const dataSubject = new Subject<string>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((data) => {
        dataSubject.next(data['weather'][0].main);
      });
      return dataSubject;
  }

  // Service method for fetching current temperature number:
  public getCurrentTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject: any = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp)));
      });
      return dataSubject;
  }

  // Service method for fetching current humidity level:
  public getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject: any = new Subject<number>();
    this.http.get(
      `https://api.weathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((weather: any) => {
        console.log(weather);
        dataSubject.next(weather.main.humidity);
      });
      return dataSubject;
  }

  // Service method for fetching currenty wind speed number:
  public getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject: any = new Subject<number>();
    this.http.get(
      `https://api.weathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Math.round(weather.wind.speed)));
      });
      return dataSubject;
  }

  // Service method for calculating and extracting maximum number of temperature:
  public getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    let max: number;
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((weather: any) => {
        max = weather.list[0].main.temp;
        weather.list.forEach((value) => {
          if (max < value.main.temp)
            max = value.main.temp;
        });
        dataSubject.next(Math.round(max));
      });
      return dataSubject;
  }

  // Service method for calculating and extracting minimum number of temperature:
  public getMinTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject: any = new Subject<number>();
    let min: number;
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe((weather: any) => {
        min = weather.list[0].main.temp;
        weather.list.forEach((value) => {
          if (min > value.main.temp)
            min = value.min.temp;
        });
        dataSubject.next(Math.round(min));
      });
      return dataSubject;
  }

  

}