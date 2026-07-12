import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ThemeService } from '../core/services/theme.service';

describe('LayoutComponent', () => {
  it('deve exibir titulo Pokedex no toolbar', async () => {
    await render(LayoutComponent, {
      providers: [provideRouter([]), ThemeService],
    });
    expect(screen.getByText('Pokedex')).toBeInTheDocument();
  });

  it('deve ter link Home no sidenav', async () => {
    await render(LayoutComponent, {
      providers: [provideRouter([]), ThemeService],
    });
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('deve ter link List Pokemon no sidenav', async () => {
    await render(LayoutComponent, {
      providers: [provideRouter([]), ThemeService],
    });
    expect(screen.getByText('List Pokemon')).toBeInTheDocument();
  });

  it('deve exibir botao de toggle tema', async () => {
    await render(LayoutComponent, {
      providers: [provideRouter([]), ThemeService],
    });
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });
});
