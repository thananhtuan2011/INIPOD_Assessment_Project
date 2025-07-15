import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { PageAllComponent } from './page-all/page-all.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { MyFavoriteComponent } from './my-favorite/my-favorite.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { FillterComponent } from './fillter/fillter.component';
const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,

      },
      {
        path: 'all',
        component: PageAllComponent,

      },
      {
        path: 'my-favorite',
        component: MyFavoriteComponent,

      },

    ]

  },

];

@NgModule({
  declarations: [
    HomeBannerComponent,
    PageComponent,
    HomeComponent,
    PageAllComponent,
    DetailPokemonComponent,
    MyFavoriteComponent,
    FillterComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormsModule,
    CoreModule,
    MatPaginatorModule,
    MatPaginatorModule,
    RouterModule.forChild(routes),
  ],
})
export class PageModule { }
