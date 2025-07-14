import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  pokemonList = [
    { id: 1, name: 'Bulbasaur', image: 'assets/pokemon/bulbasaur.png' },
    { id: 2, name: 'Ivysaur', image: 'assets/pokemon/ivysaur.png' },
    { id: 3, name: 'Venusaur', image: 'assets/pokemon/venusaur.png' },
    { id: 1, name: 'Bulbasaur', image: 'assets/pokemon/bulbasaur.png' },
    { id: 2, name: 'Ivysaur', image: 'assets/pokemon/ivysaur.png' },
    { id: 3, name: 'Venusaur', image: 'assets/pokemon/venusaur.png' },
    { id: 1, name: 'Bulbasaur', image: 'assets/pokemon/bulbasaur.png' },
    { id: 2, name: 'Ivysaur', image: 'assets/pokemon/ivysaur.png' },
    { id: 3, name: 'Venusaur', image: 'assets/pokemon/venusaur.png' },
  ]
}
