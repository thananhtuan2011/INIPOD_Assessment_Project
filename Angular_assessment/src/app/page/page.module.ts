import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeBannerComponent } from './home/home-banner/home-banner.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,

      },
    ]

  },

];

@NgModule({
  declarations: [
    HomeBannerComponent,
    PageComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class PageModule { }
