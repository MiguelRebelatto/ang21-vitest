# Spec 00 — Project Overview

## Objective

Build an Angular project (version 21, standalone components, no NgModules) that consumes the PokéAPI ([https://pokeapi.co/api/v2/](https://pokeapi.co/api/v2/)) as a mini "Pokedex", using Angular Material with a custom theme (light/dark).

## Tech stack and general requirements

- Angular 21, standalone components (no NgModules).
- Angular Material (Material 3), with primary color `#003D7A` and secondary color `#78DE1F`, supporting light and dark mode.
- `HttpClient` configured via `provideHttpClient()` in `app.config.ts`.
- Routing via `provideRouter()` / `app.routes.ts`, using `RouterLink` and `router-outlet`.
- Organized by feature folders:
  - `core/services/` (for `ThemeService`)
  - `pokemon/` (for `PokemonService`, `pokemon.model`, `pokemon-list/`, `pokemon-detail/`)
  - `layout/`
  - `home/`
  - `pokemon-list/`
  - `pokemon-detail/`
- All HTTP calls must go through a service (`PokemonService`), never directly in components.
- Styling based on Angular Material components — clean/neutral look, no heavy custom CSS.
- Basic loading (`mat-spinner`) and error handling for every HTTP call.



## Route structure


| Route             | Component                | Related spec         |
| ----------------- | ------------------------ | -------------------- |
| `''`              | `HomeComponent`          | 03-home.md           |
| `'pokemon'`       | `PokemonListComponent`   | 05-pokemon-list.md   |
| `'pokemon/:name'` | `PokemonDetailComponent` | 06-pokemon-detail.md |


All routes live "inside" the `LayoutComponent` (spec 02), which contains the `mat-toolbar` and the fixed `mat-sidenav`.

## Suggested implementation order

1. `01-theme-material.md` — install Angular Material + custom theme + light/dark toggle
2. `02-layout.md` — layout with toolbar + sidenav
3. `04-pokemon-service.md` — central HTTP service
4. `03-home.md` — home page
5. `05-pokemon-list.md` — pokemon list
6. `06-pokemon-detail.md` — pokemon detail



## Theme

- Primary color: `#003D7A`
- Secondary color: `#78DE1F`
- Light/dark mode support, toggled via a button in the toolbar
- Clean/neutral visual style — no themed "Pokémon" look (no bright red/Pokéball colors dominating the UI)
- Full palette generation details and `ThemeService` in `01-theme-material.md`



## Out of scope (for now)

- Authentication
- Favorites / persisted state (besides the theme preference)
- Automated tests (can be added later, in its own spec)
- Advanced pagination (infinite scroll, etc.) — the initial list is fixed at 100 items

