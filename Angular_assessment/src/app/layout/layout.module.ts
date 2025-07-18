import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ProgressSpinnerComponent } from './component/progress-spinner/progress-spinner.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotionComponent } from './component/notion/notion.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WebAppCheckTokenGuard } from '@app/helper/check-token.guard';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import('./../page/page.module').then(t => t.PageModule),
        canActivate: [WebAppCheckTokenGuard]
      },

    ],

  },

];

@NgModule({
  declarations: [
    LayoutComponent,
    ProgressSpinnerComponent,
    HeaderComponent,
    FooterComponent,
    NotionComponent
  ],
  imports: [
    MatDialogModule,
    CommonModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
  ],
  exports: [ProgressSpinnerComponent]
})
export class LayoutModule { }
