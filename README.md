# Pokedex Angular

Mini Pokedex built with **Angular 21** (standalone components), **Angular Material 3** (custom theme), and **PokéAPI**.

## Tech stack

- Angular 21 — standalone components, no NgModules
- Angular Material 3 — custom theme with primary `#003D7A` / secondary `#78DE1F`
- HttpClient + PokéAPI (REST)
- Vitest + @testing-library/angular — unit and UI tests
- zone.js change detection with event coalescing

## Project structure

```
src/app/
├── core/services/
│   └── theme.service.ts           ← Light/dark mode toggle (persisted)
├── layout/
│   └── layout.component.*         ← Toolbar + sidenav + router-outlet
├── home/
│   └── home.component.*           ← Welcome page with link to list
├── pokemon/                       ← Feature module
│   ├── pokemon.service.ts         ← HTTP calls to PokéAPI
│   ├── pokemon.model.ts           ← TypeScript interfaces
│   ├── pokemon-list/              ← Grid of 100 pokemon cards
│   └── pokemon-detail/            ← Individual pokemon detail
├── app.config.ts                  ← provideHttpClient, provideAnimationsAsync, ZoneChangeDetection
└── app.routes.ts                  ← Lazy-loaded routes
```

## Routes

| Route             | Component                |
|-------------------|--------------------------|
| `/`               | HomeComponent            |
| `/pokemon`        | PokemonListComponent     |
| `/pokemon/:name`  | PokemonDetailComponent   |

All routes render inside `LayoutComponent` (toolbar + sidenav).

## Getting started

```bash
npm install
ng serve        # http://localhost:4200
```

## Scripts

| Command      | Description                      |
|--------------|----------------------------------|
| `ng serve`   | Start dev server with HMR        |
| `ng build`   | Production build to `dist/`      |
| `ng test`    | Run unit tests (Vitest)          |

## Testing

Tests use **Vitest** via `@angular/build:unit-test` + `@testing-library/angular`.

```bash
ng test                  # run once
ng test --watch          # watch mode
ng test --code-coverage  # with coverage report
```

### Test files

| File                              | Tests | What it covers                    |
|-----------------------------------|-------|-----------------------------------|
| `theme.service.spec.ts`           | 8     | Signal, toggle, localStorage, DOM |
| `pokemon.service.spec.ts`         | 4     | HTTP requests (HttpTestingController) |
| `layout.component.spec.ts`        | 4     | Toolbar, sidenav, theme button    |
| `home.component.spec.ts`          | 3     | Welcome card, navigation link     |
| `pokemon-list.component.spec.ts`  | 3     | Cards, error state, router links  |
| `pokemon-detail.component.spec.ts`| 4     | Sprite, stats, chips, error, back |
| `app.spec.ts`                     | 2     | Root component bootstrap          |

**Total: 28 tests** — covering both logic (services) and UI/UX (components via testing-library).

## Theme

- Primary: `#003D7A`
- Secondary: `#78DE1F`
- Light/dark toggle in the toolbar
- Preference persisted in `localStorage` (key `pokedex-theme`)
- Default follows system `prefers-color-scheme`
- Custom Material 3 palette generated via `ng generate @angular/material:m3-theme`
