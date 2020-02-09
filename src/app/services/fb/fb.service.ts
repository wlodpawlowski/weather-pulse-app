import { Injectable } from '@angular/core';
import { AngularFireLiteAuth, AngularFireLiteFirestore } from 'angularfire-lite';
import { first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FbService {

  constructor(public auth: AngularFireLiteAuth, public fs: AngularFireLiteFirestore) { }

  public isAuth(): any {
    console.log('Function isAuthenticated from auth object:');
    console.log(this.auth.isAuthenticated());
    return this.auth.isAuthenticated();
  }

  public signin(email: string, pass: string): any {
    return this.auth.signin(email, pass);
  }

  public signup(email: string, pass: string): any {
    return this.auth.signup(email, pass);
  }

  public getCities() {
    return this.auth.uid().pipe(switchMap((uid) => {
      return this.fs.read(`${uid}`);
    }));
  }

  public addCity(name: string) {
    return this.auth.uid()
      .pipe(switchMap((uid) => {
        return this.fs
          .write(`${uid}/${name}`, {name, added: new Date()})
          .pipe(first());
      }), first());
  }

}
