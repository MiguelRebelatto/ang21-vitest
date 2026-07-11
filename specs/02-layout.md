# Spec 02 — Layout and Side Menu (Angular Material)

## Objective

Build the main layout component using Angular Material: a `mat-toolbar` at the top (with the theme toggle button) and a fixed `mat-sidenav` on the left, with the content area on the right rendering the routes.

## Component

- Name: `LayoutComponent`
- Location: `src/app/layout/layout.component.ts` (+ `.html` and `.css`/`.scss`)
- Standalone: `true`
- Required imports:
  - `RouterOutlet`, `RouterLink`, `RouterLinkActive`
  - `MatToolbarModule`
  - `MatSidenavModule`
  - `MatListModule`
  - `MatIconModule`
  - `MatButtonModule`
- Depends on: `ThemeService` (spec 01) for the light/dark toggle button



## Functional requirements

- `mat-toolbar` fixed at the top, containing:
  - Project title (e.g. "Pokedex")
  - Theme toggle button (`mat-icon-button`), calling `themeService.toggleTheme()`, with a sun/moon icon depending on the current mode
- `mat-sidenav-container` filling the rest of the screen, with:
  - Fixed `mat-sidenav` (`mode="side"`, `opened`), containing a `mat-nav-list` with:
    - "Home" item → `routerLink="/"`
    - "List Pokemon" item → `routerLink="/pokemon"`
  - `mat-sidenav-content` with a `<router-outlet></router-outlet>` inside
- Use `routerLinkActive="active-link"` on the `mat-nav-list` items to highlight the active item (Material already styles the selected `mat-list-item`, but `routerLinkActive` ensures the correct highlight per route).



## Related route structure

```typescript
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'pokemon', component: PokemonListComponent },
      { path: 'pokemon/:name', component: PokemonDetailComponent },
    ],
  },
];

```



## Template (expected structure)

```html
<mat-toolbar color="primary">
  <span>Pokedex</span>
  <span class="spacer"></span>
  <button mat-icon-button (click)="themeService.toggleTheme()">
    <mat-icon>{{ themeService.isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
  </button>
</mat-toolbar>

<mat-sidenav-container>
  <mat-sidenav mode="side" opened>
    <mat-nav-list>
      <a mat-list-item routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
        Home
      </a>
      <a mat-list-item routerLink="/pokemon" routerLinkActive="active-link">
        List Pokemon
      </a>
    </mat-nav-list>
  </mat-sidenav>

  <mat-sidenav-content>
    <router-outlet></router-outlet>
  </mat-sidenav-content>
</mat-sidenav-container>

```



## Visual layout (CSS)

- `mat-sidenav-container` with `height: calc(100vh - <toolbar-height>)`.
- `mat-sidenav` with a fixed width (e.g. `200px`).
- `.spacer { flex: 1 1 auto; }` in the toolbar, to push the theme button to the right.
- No extra CSS needed beyond these adjustments — Material 3 handles the rest.



## Acceptance criteria

- On any route, the toolbar and sidebar always stay fixed.
- Clicking "List Pokemon" navigates to `/pokemon` and the item is highlighted as active.
- The theme button correctly toggles between light/dark (see spec 01).
- The page content changes inside `mat-sidenav-content`, without reloading the toolbar/sidebar.

