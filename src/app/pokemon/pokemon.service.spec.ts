import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PokemonService } from './pokemon.service';
import { PokemonListResponse, PokemonDetail } from './pokemon.model';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getList deve fazer GET para a URL correta', () => {
    const mockResponse: PokemonListResponse = {
      count: 2,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    };

    service.getList(2, 0).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=2&offset=0'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('getList deve usar limit e offset padrao quando nao especificados', () => {
    service.getList().subscribe();

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ count: 0, next: null, previous: null, results: [] });
  });

  it('getDetail deve fazer GET para a URL correta', () => {
    const mockDetail: PokemonDetail = {
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      sprites: { front_default: 'https://example.com/pikachu.png' },
      types: [
        { slot: 1, type: { name: 'electric', url: '' } },
      ],
    };

    service.getDetail('pikachu').subscribe((res) => {
      expect(res).toEqual(mockDetail);
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockDetail);
  });

  it('getDetail deve retornar erro para pokemon inexistente', () => {
    service.getDetail('invalid-name').subscribe({
      error: (err) => {
        expect(err.status).toBe(404);
      },
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon/invalid-name'
    );
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });
});
