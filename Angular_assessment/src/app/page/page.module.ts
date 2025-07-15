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
import { SearchComponent } from './core/search/search.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { ModalWrapperComponent } from './core/modal-wrapper/modal-wrapper.component';
import { MyFavoriteComponent } from './my-favorite/my-favorite.component';
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
      {
        path: '**',
        redirectTo: "home"
      }
    ]

  },

];

@NgModule({
  declarations: [
    HomeBannerComponent,
    PageComponent,
    HomeComponent,
    PageAllComponent,
    SearchComponent,
    DetailPokemonComponent,
    ModalWrapperComponent,
    MyFavoriteComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatPaginatorModule,
    RouterModule.forChild(routes),
  ],
})
export class PageModule { }
