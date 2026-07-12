import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('deve exibir titulo de boas-vindas', async () => {
    await render(HomeComponent, {
      providers: [provideRouter([])],
    });
    expect(
      screen.getByText('Welcome to Pokedex Angular')
    ).toBeInTheDocument();
  });

  it('deve exibir descricao do projeto', async () => {
    await render(HomeComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByText(/PokéAPI/i)).toBeInTheDocument();
  });

  it('deve ter link View Pokemon list com routerLink para /pokemon', async () => {
    await render(HomeComponent, {
      providers: [provideRouter([])],
    });
    const link = screen.getByRole('link', { name: /view pokemon list/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/pokemon');
  });
});
