import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-fillter',
  templateUrl: './fillter.component.html',
  styleUrl: './fillter.component.scss'
})
export class FillterComponent {
  type!: string;
  speed!: number;
  private pokemonService = inject(PokemonService)
  @Output() onCancel = new EventEmitter<any>();
  handleCancel() {
    this.onCancel.emit()
  }


  handleApply() {
    const newValueFilter = {
      type: this.type ?? "",
      speed: this.speed ?? "0"
    }
    this.pokemonService.fillter$.next(newValueFilter)
    this.onCancel.emit()
  }
}
