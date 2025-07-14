
import { Component, OnInit, inject, DestroyRef } from "@angular/core";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { SpinnerService } from "@app/services/spinner.service";
import { AuthenticationService } from "../service/authentication.service";
import { IUserLogin } from "../interface/iLogin.interface";
import { LayoutUtilsService, MessageType } from "@app/layout/services/layout-utils.service";
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
  private layoutUtilsService = inject(LayoutUtilsService);
  constructor(
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });


  }

  ngOnInit() {
    // this.layoutUtilsService.showInfo('Thành công !', MessageType.Read, 3000, true, false, 3000, 'end', 1);
  }


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
    if (this.loginForm.invalid) {
      this.markAllControlsAsTouched();
      return
    }

    this.spinnerService.show();
    let payload: IUserLogin = {
      username: this.loginForm.controls["username"].value,
      password: this.loginForm.controls["password"].value,
    }
    this.auth_services.login(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
      if (res) {
        this.auth_services.saveToken_cookie(res.accessToken, res.refreshToken)
        this.spinnerService.hide();
        this.router.navigate(['/page/home']);
      }
      else {
        this.spinnerService.hide();
      }
    });
  }
}
