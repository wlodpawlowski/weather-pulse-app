import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { first, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly forecastURL: string = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private readonly appID: any = environment.appID;

  constructor(public http: HttpClient) {}

  public getWeather(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.baseUrl}${city}&units=${metric}&APPID=${this.appID}`
    ).pipe((first()));
  }

  public getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.forecastURL}${city}&units=${metric}&APPID=${this.appID}`
    ).pipe(first(), map((weather) => weather['list']));
  }
}