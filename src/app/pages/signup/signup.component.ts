import { Component, OnInit } from '@angular/core';
import { FbService } from '../../services/fb/fb.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./styles/signup.component.css']
})
export class SignupComponent implements OnInit {
  public errorMessage: string;
  public faUserPlus: any = faUserPlus;
  public faPlus: any = faPlus;
  public faSignInAlt: any = faSignInAlt;

  constructor(public fb: FbService, public router: Router) {
  }

  ngOnInit() {

  }

  public signup(e: any): any {
    console.log('Signup data was received:');
    console.log(e.target);
    this.fb.signup(e.target.email.value, e.target.password.value).pipe(first()).subscribe(() => {
      this.router.navigateByUrl('');
    }, (err) => {
      this.errorMessage = err;
      setTimeout(() => this.errorMessage = '', 2000);
    });
  }
}