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
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  constructor() {
    
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}