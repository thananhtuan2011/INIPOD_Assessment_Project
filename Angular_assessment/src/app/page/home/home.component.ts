import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SpinnerService } from '@app/services/spinner.service';
import { Pokemon } from '../interface/iPokemon.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PokemonService } from '../services/pokemon.service';
import { DetailPokemonDialog } from '../dialog/detailPokemon.dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private spinnerService = inject(SpinnerService)
  private pokemonService = inject(PokemonService)
  private detailDialog = inject(DetailPokemonDialog)
  pokemonList: Pokemon[] = [
  ]
  DetailPokemon(data: Pokemon) {
    this.detailDialog.open(data);
  }
  Import() {
    this.spinnerService.show();
    this.pokemonService.ImportData().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
      if (res) {
        this.GetPokemon();
        this.spinnerService.hide();
      }
    });
  }

  GetPokemon() {
    this.spinnerService.show();
    this.pokemonService.GetPokemon().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
      if (res) {
        this.pokemonList = res;
        this.spinnerService.hide();
      }
    });
  }
  ngOnInit(): void {
    this.GetPokemon();

  }
}
