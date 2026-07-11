# Spec 04 — PokemonService (data layer)

## Objective

Centralize every HTTP call to the PokéAPI in a single service, so components never call `HttpClient` directly.

## Service

- Name: `PokemonService`
- Location: `src/app/core/services/pokemon.service.ts` (or `src/app/pokemon/pokemon.service.ts`)
- Decorated with `@Injectable({ providedIn: 'root' })`

## Required methods

### `getList(limit = 100, offset = 0): Observable<PokemonListResponse>`

- Performs a GET to `https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}`
- Returns the raw JSON (`count`, `next`, `previous`, `results: {name, url}[]`)



### `getDetail(name: string): Observable<PokemonDetail>`

- Performs a GET to `https://pokeapi.co/api/v2/pokemon/{name}`
- Returns the raw JSON with `name`, `height`, `weight`, `sprites`, `types`, etc.



## Typing (suggested interfaces)

Create a `pokemon.model.ts` file with at least:

```typescript
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
  types: PokemonType[];
}

```



## Error handling

- No error handling inside the service itself (leave `catchError`/handling to the consumer — see specs 05 and 06), unless you decide to add a global HTTP interceptor (out of scope for now).



## Acceptance criteria

- No component imports `HttpClient` directly; all of them use `PokemonService`.
- Both methods return typed Observables (not `any`).

