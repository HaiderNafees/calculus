import { Injectable, computed, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const KEY = 'cl-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _theme = signal<Theme>(this.initial());

  readonly theme = computed(() => this._theme());
  readonly isDark = computed(() => this._theme() === 'dark');

  constructor() {
    this.apply(this._theme());
  }

  toggle(): void {
    this.set(this.isDark() ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this._theme.set(theme);
    this.apply(theme);
    try { localStorage.setItem(KEY, theme); } catch { /* noop */ }
  }

  private initial(): Theme {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch { /* noop */ }
    return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  private apply(theme: Theme): void {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }
}
