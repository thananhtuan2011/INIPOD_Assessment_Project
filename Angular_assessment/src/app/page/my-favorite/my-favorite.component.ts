import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { SpinnerService } from '@app/services/spinner.service';
import { PokemonService } from '../services/pokemon.service';
import { DetailPokemonDialog } from '../dialog/detailPokemon.dialog';
import { Pokemon } from '../interface/iPokemon.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrl: './my-favorite.component.scss'
})
export class MyFavoriteComponent implements OnInit {
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





  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.GetMyFavorite(this.pageIndex + 1, this.pageSize, "")
  }
  handleSearch(search: string) {
    this.searchSubject.next(search);
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  GetMyFavorite(page: number, limit: number, search: string) {
    this.spinnerService.show();
    this.pokemonService.GetMyFavorite({
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
    this.GetMyFavorite(this.pageIndex + 1, this.pageSize, "");
    const sb = this.searchSubject.pipe(debounceTime(300)).subscribe((search) => {
      this.search = search ?? "";
      this.GetMyFavorite(this.pageIndex + 1, this.pageSize, this.search)
    });
    this._subscriptions.push(sb)

  }
}