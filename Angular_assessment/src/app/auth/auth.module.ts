import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthLayoutComponent } from '@app/layout/component/auth-layout/auth-layout.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [

  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,

      },
      {
        path: 'sign-up',
        component: RegisterComponent,

      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
      },

    ],

  },


];

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: []
})
export class AuthModule { }
