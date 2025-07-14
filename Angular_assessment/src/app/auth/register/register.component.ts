import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { SpinnerService } from '@app/services/spinner.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';

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
    // if (this.auth_services.getAccessToken()) {
    //   this.router.navigate(['/']);
    // }
    // this.activatedRoute.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params: any) => {
    //   if (params?.id) {
    //     this.businessId = params.id;
    //     this.auth_services.GetUserByBusinessId(params.id).subscribe({
    //       next: (val) => {
    //         if (val) {
    //           this.registerForm.patchValue({
    //             email: val.email,
    //             company: val.company
    //           });
    //           this.registerForm.get("email").disable();
    //           this.registerForm.get("company").disable();
    //         }
    //       }
    //     })
    //   }
    // });
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
    if (this.registerForm.invalid) {
      this.markAllControlsAsTouched();
      return
    }

    this.spinnerService.show();
    // const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const userZoneCode = timezoneMapping[userTimeZone] || userTimeZone;

    // const userZone = TIMEZONE.find(zone => zone.Moment.includes(userZoneCode));

    // let payload: User = {
    //   firstName: this.registerForm.controls["firstname"].value,
    //   lastName: this.registerForm.controls["lastname"].value,
    //   email: this.registerForm.controls["email"].value,
    //   timeZoneId: userZone?.Code,
    //   password: this.registerForm.controls["password"].value,
    // }
    // this.auth_services.Register(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
    //   if (res) {
    //     this.spinnerService.hide();
    //     this.auth_services.saveToken_cookie(res.accessToken, res.refreshToken)
    //     this.router.navigate(['/']);
    //     // if (this.registerForm.controls["company"].value && !this.businessId) {
    //     //   let userbusiness = {
    //     //     id: res.id,
    //     //     name: this.registerForm.controls["company"].value
    //     //   }
    //     //   this.userbusiness_services.CreateUserBusiness(userbusiness).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    //     //     next: (reponse) => {


    //     //     }
    //     //   })
    //     // }

    //   }
    //   else {
    //     this.spinnerService.hide();
    //     this._toastService.showError("Your account already exists", "Error")
    //   }
    // }
    // )
  }

}
