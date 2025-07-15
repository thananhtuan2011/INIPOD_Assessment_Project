import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SpinnerService } from '@app/services/spinner.service';
import { Pokemon } from '../interface/iPokemon.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PokemonService } from '../services/pokemon.service';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { DetailPokemonDialog } from './../dialog/detailPokemon.dialog';
import { FavoriteService } from '../services/favorite.service';
import { Favorite } from '../interface/iFavorite.interface';

@Component({
  selector: 'app-page-all',
  templateUrl: './page-all.component.html',
  styleUrl: './page-all.component.scss'
})
export class PageAllComponent implements OnInit {
  length = 50;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 50, 100];
  public search: string = '';
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pokemonList: Pokemon[] = [
  ]
  pageEvent!: PageEvent;

  private searchSubject = new Subject<string>();
  private _subscriptions: Subscription[] = [];
  private destroyRef = inject(DestroyRef);
  private spinnerService = inject(SpinnerService)
  private pokemonService = inject(PokemonService)
  private detailDialog = inject(DetailPokemonDialog)
  private favoriteService = inject(FavoriteService)



  CreateFavorite(pokemonId: number) {
    let payload: Favorite = {
      pokemonId: pokemonId
    }
    this.favoriteService.Create(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
      if (response) {
        this.GetPokemon(this.pageIndex + 1, this.pageSize, "");
      }

    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.GetPokemon(this.pageIndex + 1, this.pageSize, "")
  }
  handleSearch(search: string) {
    this.searchSubject.next(search);
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  GetPokemon(page: number, limit: number, search: string) {
    this.spinnerService.show();
    this.pokemonService.getPokemonList({
      page: page,
      limit: limit,
      search: search,
      sortBy: '',
      sortOrder: 'DESC'
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
      this.pokemonList = response.data;
      console.log("pokemonList", this.pokemonList);

      this.length = response.total;
      this.spinnerService.hide();
    });
  }
  DetailPokemon(data: Pokemon) {
    this.detailDialog.open(data);
  }
  ngOnInit(): void {
    this.GetPokemon(this.pageIndex + 1, this.pageSize, "");
    const sb = this.searchSubject.pipe(debounceTime(300)).subscribe((search) => {
      this.search = search ?? "";
      this.GetPokemon(this.pageIndex + 1, this.pageSize, this.search)
    });
    this._subscriptions.push(sb)

  }
}
