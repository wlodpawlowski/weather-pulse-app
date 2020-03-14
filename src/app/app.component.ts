import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiService } from './services/ui/ui.service'
import { FbService } from './services/fb/fb.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles/app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public showMenu: boolean = false;
  public darkModeActive: boolean
  `-;
  public userEmail: string = '';
  `-/

  constructor(public ui: UiService, public fb: FbService, public router: Router)  {}

  public loggedIn: boolean = this.fb.isAuth();
  public sub1;

  ngOnInit() {
   this.sub1 = this.ui.darkModeState.subscribe((value) => {
     this.darkModeActive = value;
   });
   this.fb.auth.userData().subscribe((user) => {
     this.userEmail = user.email;
   });
  }

  public toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  public modeToggleSwitch(): void {
    this.ui.darkModeState.next(!this.darkModeActive);
  }

  ngOnDestroy() {
   this.sub1.unsubscribe();
  }

  public logout(): void {
    this.toggleMenu();
    this.router.navigateByUrl('/login');
    this.fb.auth.signout();
  }
}