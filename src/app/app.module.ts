import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from '../app/pages/signup/signup.component';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireLite } from 'angularfire-lite';
import { environment } from '../environments/environment';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ErrorComponent } from './ui/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { WeatherCardComponent } from './ui/weather-card/weather-card.component';
import { AddCardComponent } from './ui/add-card/add-card.component';
import { AddComponent } from './pages/add/add.component';
import { DetailsComponent } from './pages/details/details.component';
/*
import { HomeComponent } from './home/home.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { AddCardComponent } from './add-card/add-card.component';
import { DetailsComponent } from './details/details.component';
import { SignupComponent } from './pages/signup/signup.component';
*/

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ErrorComponent,
    LoginComponent,
    HomeComponent,
    WeatherCardComponent,
    AddCardComponent,
    AddComponent,
    DetailsComponent,
    /*
    HomeComponent,
    WeatherCardComponent,
    AddCardComponent,
    DetailsComponent,
    SignupComponent,
    */
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NguiAutoCompleteModule,
    FormsModule,
    AngularFireLite.forRoot(environment.config),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
