# Spec 05 — Pokemon List Page

## Objective

Display a list/grid of pokemon returned by the PokéAPI, using Material components, each one navigable to its corresponding detail page.

## Component

- Name: `PokemonListComponent`
- Location: `src/app/pokemon-list/pokemon-list.component.ts` (+ `.html` and `.css`/`.scss`)
- Standalone: `true`
- Required imports:
  - `CommonModule`, `RouterLink`
  - `MatCardModule` (one card per pokemon)
  - `MatProgressSpinnerModule` (loading state)
  - `MatIconModule` (error icon, optional)
  - `MatGridListModule` or plain CSS Grid/Flexbox for the grid layout
- Route: `'pokemon'` (inside `LayoutComponent`)
- Depends on: `PokemonService` (spec 04)



## Functional requirements

- On component load, call `pokemonService.getList(100, 0)`.
- Show **loading** with a centered `mat-spinner` (`MatProgressSpinnerModule`) while the call is pending.
- Show **error** if the call fails (e.g. a `color="warn"` card/message, "Could not load the list.").
- On success, render `results` as a grid of `mat-card`, each card showing the pokemon's name (capitalized).
- Each `mat-card` must be clickable (the whole card, not just a text link) and navigate to `/pokemon/{name}` — use `[routerLink]` on the card itself or wrap it in an `<a>` with the default link styling removed.



## Suggested component structure

```typescript
@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {
  private pokemonService = inject(PokemonService);

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

```



## Template (expected behavior)

- `*ngIf="loading"` → centered `<mat-spinner></mat-spinner>`
- `*ngIf="error"` → styled error message
- `*ngIf="!loading && !error"` → grid of `mat-card` via `*ngFor` over `pokemons`, each card with `[routerLink]="['/pokemon', p.name]"`



## Visual layout (CSS)

- Simple responsive grid (CSS Grid: `grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))` or `MatGridListModule`, either works).
- Cards with `cursor: pointer` and a light hover effect (`mat-elevation` already helps visually).



## Out of scope (for this spec)

- Pagination using `next`/`previous`.
- Search/filter by name.



## Acceptance criteria

- Visiting `/pokemon` shows a list of up to 100 pokemon as cards.
- Clicking any card correctly navigates to `/pokemon/{name}`.
- Loading (spinner) and error states are visible when applicable.

