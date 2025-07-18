import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import('./layout/layout.module').then(t => t.LayoutModule),

  },
  {
    path: "auth",
    loadChildren: () =>
      import('./auth/auth.module').then(t => t.AuthModule),
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
