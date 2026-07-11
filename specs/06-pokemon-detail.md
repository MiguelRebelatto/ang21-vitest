# Spec 06 — Pokemon Detail Page

## Objective

Display the details of a specific pokemon, based on the name received via route parameter, using Material components.

## Component

- Name: `PokemonDetailComponent`
- Location: `src/app/pokemon-detail/pokemon-detail.component.ts` (+ `.html` and `.css`/`.scss`)
- Standalone: `true`
- Required imports:
  - `CommonModule`, `RouterLink`
  - `MatCardModule`
  - `MatProgressSpinnerModule`
  - `MatChipsModule` (to display the pokemon's types as chips)
  - `MatButtonModule`, `MatIconModule` ("Back" button)
- Route: `'pokemon/:name'` (inside `LayoutComponent`)
- Depends on: `PokemonService` (spec 04)

## Functional requirements

- Read the `name` route parameter **reactively**, using `route.paramMap` as an Observable (not `snapshot.paramMap`), to support navigating between detail pages without a full page reload.
- On every change of the `name` parameter, trigger a new GET via `pokemonService.getDetail(name)`.
- Show **loading** with a `mat-spinner` while the call is pending.
- Show **error** if the call fails (e.g. invalid/nonexistent name), with a button to go back to the list.
- On success, display inside a `mat-card`:
  - Pokemon name (capitalized, as the card title)
  - Image (the `front_default` sprite)
  - Height (`height`) and weight (`weight`)
  - Types (`types[].type.name`) as `mat-chip` inside a `mat-chip-set`, using `color="secondary"` on the chips (`#78DE1F` — see spec 01) to highlight the types without overloading the rest of the page
- Include a button (`mat-button` with an `arrow_back` icon) "Back to list", with `routerLink="/pokemon"`.

## Suggested component structure

```typescript
@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatProgressSpinnerModule, MatChipsModule, MatButtonModule, MatIconModule],
  templateUrl: './pokemon-detail.component.html',
})
export class PokemonDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);

  pokemon?: PokemonDetail;
  loading = true;
  error = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('name');
      if (!name) return;

      this.loading = true;
      this.error = false;

      this.pokemonService.getDetail(name).subscribe({
        next: (res) => {
          this.pokemon = res;
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        },
      });
    });
  }
}

```

## Template (expected behavior)

- `*ngIf="loading"` → centered `<mat-spinner></mat-spinner>`
- `*ngIf="error"` → error message + "Back to list" button
- `*ngIf="pokemon && !loading"` → `mat-card` with name, image, height, weight and type chips

## Acceptance criteria

- Visiting `/pokemon/pikachu` shows Pikachu's correct data inside the card.
- Manually changing the URL to another valid name updates the page without a full reload.
- A nonexistent name shows the error state, without breaking the app.
- The "Back to list" button works correctly.

