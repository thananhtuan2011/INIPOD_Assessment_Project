
import { Component, OnInit, inject, DestroyRef } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginSocialComponent } from '../login-social/login-social.component';
import { AuthLayoutComponent } from "@app/layout/component/auth-layout/auth-layout.component";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { SpinnerService } from "@app/services/spinner.service";
import { AuthenticationService } from "../service/authentication.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public isShowPassword = false;

  public loginForm: UntypedFormGroup;
  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(UntypedFormBuilder);
  private auth_services = inject(AuthenticationService)
  private spinnerService = inject(SpinnerService)
  private router = inject(Router);
  constructor(
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
      rememberMe: [false, []],
    });


  }

  ngOnInit() {
    // if (this.auth_services.getAccessToken()) {
    //   this.router.navigate(['/']);
    // }
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls as Record<string, FormControl>;
  }

  handleToggleShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  markAllControlsAsTouched() {
    Object.values(this.f).forEach(control => {
      control.markAsTouched();
    });
  }


  onSubmit() {
    // if (this.loginForm.invalid) {
    //   this.markAllControlsAsTouched();
    //   return
    // }

    // this.spinnerService.show();
    // let payload: IUserLogin = {
    //   Email: this.loginForm.controls["email"].value,
    //   Password: this.loginForm.controls["password"].value,
    // }
    // this.auth_services.login(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
    //   if (res.isSuccess) {
    //     this.auth_services.saveToken_cookie(res.token.accessToken, res.token.refreshToken)
    //     this.spinnerService.hide();
    //     this.router.navigate(['/']);
    //   }
    //   else {
    //     this.spinnerService.hide();
    //     this._toastService.showError("Error", res.message)
    //   }
    // });
  }
}
