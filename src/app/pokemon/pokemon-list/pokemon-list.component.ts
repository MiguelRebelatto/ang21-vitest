import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PokemonService } from '../pokemon.service';
import { PokemonListItem } from '../pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  private readonly pokemonService = inject(PokemonService);

  pokemons: PokemonListItem[] = [];
  loading = true;
  error = false;

  ngOnInit(): void {
    this.pokemonService.getList(100, 0).subscribe({
      next: (res) => {
        this.pokemons = res.results;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }
}
