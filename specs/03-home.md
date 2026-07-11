# Spec 03 — Home Page

## Objective

A simple welcome page, with no HTTP calls, using Material components to stay visually consistent with the rest of the app.

## Component

- Name: `HomeComponent`
- Location: `src/app/home/home.component.ts` (+ `.html` and `.css`/`.scss`)
- Standalone: `true`
- Required imports: `MatCardModule`, `MatButtonModule`, `RouterLink`
- Route: `''` (inside `LayoutComponent` — see spec 02)

## Functional requirements

- Content inside a `mat-card`, with:
  - A welcome title (e.g. "Welcome to Pokedex Angular")
  - A short project description (1–2 paragraphs), explaining that data comes from the PokéAPI
  - A button (`mat-raised-button` or `mat-flat-button`, `color="primary"`) "View Pokemon list", with `routerLink="/pokemon"`



## Out of scope

- No HTTP calls on this page.
- No state logic.



## Acceptance criteria

- Visiting `/` shows the Home page inside the layout, with the card centered and styled according to the active theme (light/dark).
- The button correctly navigates to `/pokemon`.
- No network calls are made by this component.

