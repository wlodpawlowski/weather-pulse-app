import { Component, OnInit } from '@angular/core';
import { FbService } from '../../services/fb/fb.service';
import { first, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./styles/login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage: string = '';
  public faSignInAlt: any = faSignInAlt;
  public faUserPlus: any = faUserPlus;
  constructor(public fb: FbService, public router: Router) {
  }

  ngOnInit() {
  }

  public login(e: any): void {
    this.fb.signin(e.target.email.value, e.target.password.value).pipe(first()).subscribe(() => {
      this.router.navigateByUrl('');
    },(err) => {
      this.errorMessage = err;
      setTimeout(() => this.errorMessage = '', 2000);
    });
  }

}