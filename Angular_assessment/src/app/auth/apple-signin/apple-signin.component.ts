import { Component } from '@angular/core';
declare var AppleID: any;
@Component({
  selector: 'app-apple-signin',
  standalone: true,
  imports: [],
  templateUrl: './apple-signin.component.html',
  styleUrl: './apple-signin.component.scss'
})
export class AppleSigninComponent {

  public async loginApple() {
    try {
      AppleID.auth.init({
        clientId: 'VRSignIn',
        scope: 'name email',
        redirectURI: 'https://angular-apple-signin.stackblitz.io/apple-callback',
        state: 'init',
        nonce: 'test',
        usePopup: true //or false defaults to false
      });
      const data = await AppleID.auth.signIn();

    } catch (error) {
      console.log(error)
      //handle error.
    }
  }
  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
}
