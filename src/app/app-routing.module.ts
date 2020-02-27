import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { AddComponent } from '../app/pages/add/add.component';
import { SignupComponent } from '../app/pages/signup/signup.component';
import { LoginComponent } from '../app/pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AppGuard } from './guards/app.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AppGuard] },
  { path: 'add', component: AddComponent, canActivate: [AppGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
