import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import('./layout/layout.module').then(t => t.LayoutModule),
    // canActivate: [WebAppCheckTokenGuard]
  },
  {
    path: "auth",
    loadChildren: () =>
      import('./auth/auth.module').then(t => t.AuthModule),
    // canActivate: [WebAppCheckTokenGuard]
  },
  {
    path: '**',
    redirectTo: "auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
