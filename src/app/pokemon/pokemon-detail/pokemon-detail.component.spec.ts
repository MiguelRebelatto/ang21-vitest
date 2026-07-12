import { render, screen } from '@testing-library/angular';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonService } from '../pokemon.service';
import { of, throwError } from 'rxjs';

describe('PokemonDetailComponent', () => {
  const mockDetail = {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    sprites: { front_default: 'https://example.com/pikachu.png' },
    types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  };

  function mockRoute(name: string) {
    return {
      paramMap: of({ get: (key: string) => (key === 'name' ? name : null) }),
    };
  }

  it('deve exibir nome do pokemon apos carregar', async () => {
    await render(PokemonDetailComponent, {
      providers: [
        { provide: PokemonService, useValue: { getDetail: () => of(mockDetail) } },
        { provide: ActivatedRoute, useValue: mockRoute('pikachu') },
      ],
    });

    expect(await screen.findByText('Pikachu')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro para pokemon inexistente', async () => {
    await render(PokemonDetailComponent, {
      providers: [
        {
          provide: PokemonService,
          useValue: { getDetail: () => throwError(() => new Error('not found')) },
        },
        { provide: ActivatedRoute, useValue: mockRoute('invalid') },
      ],
    });

    expect(await screen.findByText('Could not load pokemon details.')).toBeInTheDocument();
  });

  it('deve exibir sprite do pokemon', async () => {
    await render(PokemonDetailComponent, {
      providers: [
        { provide: PokemonService, useValue: { getDetail: () => of(mockDetail) } },
        { provide: ActivatedRoute, useValue: mockRoute('pikachu') },
      ],
    });

    const img = await screen.findByAltText('pikachu');
    expect(img).toHaveAttribute('src', 'https://example.com/pikachu.png');
  });

  it('deve ter botao Back to list', async () => {
    await render(PokemonDetailComponent, {
      providers: [
        {
          provide: PokemonService,
          useValue: { getDetail: () => throwError(() => new Error('not found')) },
        },
        { provide: ActivatedRoute, useValue: mockRoute('invalid') },
      ],
    });

    expect(await screen.findByText(/back to list/i)).toBeInTheDocument();
  });
});
