import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../pokemon.service';
import { of, throwError } from 'rxjs';
import { PokemonListResponse } from '../pokemon.model';

describe('PokemonListComponent', () => {
  const mockResponse: PokemonListResponse = {
    count: 3,
    next: null,
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    ],
  };

  it('deve exibir cards apos carregar os dados', async () => {
    await render(PokemonListComponent, {
      providers: [
        provideRouter([]),
        {
          provide: PokemonService,
          useValue: { getList: () => of(mockResponse) },
        },
      ],
    });

    expect(await screen.findByText('Bulbasaur')).toBeInTheDocument();
    expect(await screen.findByText('Charmander')).toBeInTheDocument();
    expect(await screen.findByText('Squirtle')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro em caso de falha', async () => {
    await render(PokemonListComponent, {
      providers: [
        provideRouter([]),
        {
          provide: PokemonService,
          useValue: { getList: () => throwError(() => new Error('fail')) },
        },
      ],
    });

    expect(
      await screen.findByText('Could not load the list.')
    ).toBeInTheDocument();
  });

  it('cada card deve ter routerLink para /pokemon/{name}', async () => {
    await render(PokemonListComponent, {
      providers: [
        provideRouter([]),
        {
          provide: PokemonService,
          useValue: { getList: () => of(mockResponse) },
        },
      ],
    });

    const link = await screen.findByText('Bulbasaur');
    const anchor = link.closest('a');
    expect(anchor).toHaveAttribute('href', '/pokemon/bulbasaur');
  });
});
