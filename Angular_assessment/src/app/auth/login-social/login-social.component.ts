import { Component, DestroyRef, inject } from '@angular/core';
import { GoogleSigninComponent } from '../google-signin/google-signin.component';
import { AppleSigninComponent } from '../apple-signin/apple-signin.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-social',

  templateUrl: './login-social.component.html',
  styleUrl: './login-social.component.scss'
})
export class LoginSocialComponent {
  // user: SocialUser | null = null;
  // router = inject(Router);
  // private dialog = inject(MatDialog)
  // destroyRef = inject(DestroyRef);
  // authService = inject(SocialAuthService);
  // private auth_services = inject(AuthenticationService)
  // private spiner_services = inject(SpinnerService)
  // constructor(private factorCodeDialog: FactorCodeDialog) {
  //   this.authService.authState.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
  //     if (user) {
  //       this.user = user;
  //       this.spiner_services.show();
  //       let payload: User = {
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         email: user.email,
  //         is2FAEnabled: true
  //       }
  //       this.auth_services.SignUp(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
  //         if (res) {
  //           this.spiner_services.hide();
  //           this.OpenTwoFactorCode(this.user);

  //         }
  //       }
  //       )
  //     }
  //   });

  // }
  // OpenTwoFactorCode(item: any) {

  //   const dialogRef = this.factorCodeDialog.open(item);
  //   dialogRef.then((c) => {
  //     c.afterClosed().subscribe((res) => {
  //       if (res) {
  //         this.auth_services.saveToken_cookie(res.accessToken, res.refreshToken)
  //         this.router.navigate(['/']);
  //         this.spiner_services.hide();
  //       }
  //     })
  //   });

  // }
  // loginWithGoogle() {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // googleSignin(googleWrapper: any) {
  //   googleWrapper.click();
  // }
}
