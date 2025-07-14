import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ProgressSpinnerComponent } from './component/progress-spinner/progress-spinner.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: "page",
        loadChildren: () =>
          import('./../page/page.module').then(t => t.PageModule),
      },
    ]

  },
];

@NgModule({
  declarations: [
    LayoutComponent,
    ProgressSpinnerComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [ProgressSpinnerComponent]
})
export class LayoutModule { }
