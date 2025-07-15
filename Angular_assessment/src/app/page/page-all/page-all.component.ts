import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from '@app/services/spinner.service';
import { Pokemon } from '../interface/iPokemon.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PokemonService } from '../services/pokemon.service';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { DetailPokemonDialog } from './../dialog/detailPokemon.dialog';
import { FavoriteService } from '../services/favorite.service';
import { Favorite } from '../interface/iFavorite.interface';
import { PopoverComponent } from '../core/popover/popover.component';
import { Fillter } from '../interface/ifillter.interface';

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
  public fillter: string = "name"
  @ViewChild(PopoverComponent) searchResultComponent!: PopoverComponent;
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
        this.GetPokemon(this.pageIndex + 1, this.pageSize, "", '', 0);
      }

    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.GetPokemon(this.pageIndex + 1, this.pageSize, "", '', 0)
  }
  handleSearch(search: string) {
    this.searchSubject.next(search);
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  GetPokemon(page: number, limit: number, search: string, type: string, speed: number) {
    this.spinnerService.show();
    this.pokemonService.getPokemonList({
      page: page,
      limit: limit,
      search: search,
      type: type,
      speed: speed,
      sortBy: '',
      sortOrder: 'DESC'
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
      this.pokemonList = response.data;

      this.length = response.total;
      this.spinnerService.hide();
    });
  }
  DetailPokemon(data: Pokemon) {
    this.detailDialog.open(data);
  }
  ngOnInit(): void {
    this.GetPokemon(this.pageIndex + 1, this.pageSize, "", '', 0);
    const sb = this.searchSubject.pipe(debounceTime(300)).subscribe((search) => {
      this.search = search ?? "";
      this.GetPokemon(this.pageIndex + 1, this.pageSize, this.search, '', 0)
    });
    this._subscriptions.push(sb)

    const sbfillter = this.pokemonService.fillter$.pipe().subscribe((filter: Fillter) => {
      if (filter) {
        this.GetPokemon(this.pageIndex + 1, this.pageSize, this.search, filter.type, Number.parseInt(filter.speed.toString()))
      }
      else {
        this.GetPokemon(this.pageIndex + 1, this.pageSize, this.search, '', 0)

      }
    });
    this._subscriptions.push(sbfillter)


  }
  handleCloseFilter() {
    this.searchResultComponent.handleHideContent()
  }
  handleFillter($event: any) {

  }
}
