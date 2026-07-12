import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'pokemon',
        loadComponent: () =>
          import('./pokemon/pokemon-list/pokemon-list.component').then(
            (c) => c.PokemonListComponent
          ),
      },
      {
        path: 'pokemon/:name',
        loadComponent: () =>
          import('./pokemon/pokemon-detail/pokemon-detail.component').then(
            (c) => c.PokemonDetailComponent
          ),
      },
    ],
  },
];
