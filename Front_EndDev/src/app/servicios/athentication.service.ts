import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AthenticationService {
  constructor(private auth: AuthService) {}

  loginWithGoogle(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    const options : any = { returnTo: window.location.origin }
    this.auth.logout(options);
  }
}
