import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark-theme');
    TestBed.resetTestingModule();
    service = TestBed.inject(ThemeService);
  });

  it('deve iniciar com light se nao houver preferencia salva', () => {
    expect(service.isDark()).toBe(false);
  });

  it('deve restaurar tema escuro salvo no localStorage', () => {
    localStorage.setItem('pokedex-theme', 'dark');
    TestBed.resetTestingModule();
    service = TestBed.inject(ThemeService);
    expect(service.isDark()).toBe(true);
  });

  it('deve restaurar tema claro salvo no localStorage', () => {
    localStorage.setItem('pokedex-theme', 'light');
    TestBed.resetTestingModule();
    service = TestBed.inject(ThemeService);
    expect(service.isDark()).toBe(false);
  });

  it('toggleTheme deve inverter isDark', () => {
    const initial = service.isDark();
    service.toggleTheme();
    expect(service.isDark()).toBe(!initial);
  });

  it('toggleTheme deve persistir em localStorage', () => {
    service.toggleTheme();
    expect(localStorage.getItem('pokedex-theme')).toBe('dark');
    service.toggleTheme();
    expect(localStorage.getItem('pokedex-theme')).toBe('light');
  });

  it('toggleTheme deve adicionar classe dark-theme no html', () => {
    service.toggleTheme();
    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
  });

  it('toggleTheme deve remover classe dark-theme no html ao alternar de volta', () => {
    service.toggleTheme();
    service.toggleTheme();
    expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
  });

  it('deve respeitar prefers-color-scheme se nao houver preferencia salva', () => {
    localStorage.clear();
    window.matchMedia = ((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as typeof window.matchMedia;
    TestBed.resetTestingModule();
    service = TestBed.inject(ThemeService);
    expect(service.isDark()).toBe(true);
  });
});
