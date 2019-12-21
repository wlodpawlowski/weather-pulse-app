import { Component, OnInit } from '@angular/core';
import { FbService } from '../../services/fb/fb.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./styles/signup.component.css']
})
export class SignupComponent implements OnInit {
  public errorMessage: string;

  constructor(public fb: FbService, public router: Router) {
  }

  ngOnInit() {

  }

  public signup(e: any): void {
    this.fb.signup(e.target.email.value, e.target.password.value).pipe(first()).subscribe(() => {
      this.router.navigateByUrl('');
    }, (err) => {
      this.errorMessage = err;
      setTimeout(() => this.errorMessage = '', 2000);
    });
  }
}