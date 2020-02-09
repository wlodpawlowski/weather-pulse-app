import { Component, OnInit } from '@angular/core';
import { FbService } from '../../services/fb/fb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./styles/home.component.css']
})
export class HomeComponent implements OnInit {
  public cities: any;

  constructor(public fb: FbService) {}

  ngOnInit() {
    this.cities = this.fb.getCities();
    console.log('Fetched list of cities from the Firebase Cloud Server:');
    console.log(this.cities);
  }
}