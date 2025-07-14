import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { SpinnerService } from '@app/services/spinner.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  public isShowPassword = false;
  listCompany: any[] = []
  public showPassword!: boolean;
  public registerForm!: UntypedFormGroup;
  with_button!: number;

  private destroyRef = inject(DestroyRef);
  private router = inject(Router)
  private auth_services = inject(AuthenticationService)
  private spinnerService = inject(SpinnerService)
  private formBuilder = inject(UntypedFormBuilder)

  constructor(
  ) {
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ["", Validators.compose([Validators.required])],
      agree: [false, Validators.compose([Validators.required])],
    },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
  }

  ngOnInit() {

  }

  handleToggleShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  get f() {
    return this.registerForm.controls as Record<string, FormControl>;
  }

  markAllControlsAsTouched() {
    Object.values(this.f).forEach(control => {
      control.markAsTouched();
    });
  }


  onSubmit() {
    if (this.registerForm.invalid || !this.registerForm.controls["agree"].value) {
      this.markAllControlsAsTouched();
      return
    }

    this.spinnerService.show();
    let payload: any = {
      username: this.registerForm.controls["username"].value,
      password: this.registerForm.controls["password"].value,
    }
    this.auth_services.Register(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {

      if (res) {
        this.spinnerService.hide();
        this.auth_services.saveToken_cookie(res.accessToken, res.refreshToken)
        this.router.navigate(['/auth/login']);
      }
      else {
        this.spinnerService.hide();
      }
    }
    )
  }

}
