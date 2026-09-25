import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-40 border-b border-rule bg-surface/90 backdrop-blur">
      <div class="max-w-[1180px] mx-auto px-5 md:px-10 h-14 flex items-center justify-between gap-4">
        <a routerLink="/" class="flex items-center gap-2.5 min-w-0" aria-label="CalculusLearn home">
          <span class="w-6 h-6 bg-accent flex items-center justify-center rounded-[2px] shrink-0">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-white dark:text-[#0d1512]" aria-hidden="true">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </span>
          <span class="font-semibold text-[15px] text-ink truncate">CalculusLearn</span>
          <span class="chip hidden sm:inline-flex">BETA</span>
        </a>

        <nav class="hidden md:flex items-center gap-1" aria-label="Primary">
          <a routerLink="/" routerLinkActive="nav-active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link" aria-label="Dashboard">Dashboard</a>
          <a routerLink="/skills" routerLinkActive="nav-active" class="nav-link" aria-label="Skill explorer">Skills</a>
          <a routerLink="/about" routerLinkActive="nav-active" class="nav-link" aria-label="About">About</a>
        </nav>

        <div class="flex items-center gap-1.5">
          <button class="btn btn-ghost !min-h-[36px] !px-2.5" type="button"
                  (click)="theme.toggle()"
                  [attr.aria-label]="theme.isDark() ? 'Switch to light mode' : 'Switch to dark mode'">
            @if (theme.isDark()) {
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"/></svg>
            } @else {
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
            }
          </button>
          <button class="btn btn-ghost md:hidden !min-h-[36px] !px-2.5" type="button"
                  (click)="menuOpen = !menuOpen"
                  [attr.aria-expanded]="menuOpen"
                  aria-controls="mobile-nav"
                  aria-label="Toggle navigation menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>

      @if (menuOpen) {
        <nav id="mobile-nav" class="md:hidden border-t border-rule bg-surface px-5 py-3 flex flex-col" aria-label="Mobile">
          <a routerLink="/" routerLinkActive="nav-active" (click)="menuOpen = false" class="nav-link py-2.5">Dashboard</a>
          <a routerLink="/skills" routerLinkActive="nav-active" (click)="menuOpen = false" class="nav-link py-2.5">Skills</a>
          <a routerLink="/about" routerLinkActive="nav-active" (click)="menuOpen = false" class="nav-link py-2.5">About</a>
        </nav>
      }
    </header>
  `,
  styles: [`
    .nav-link { padding: 8px 14px; font-size: 14px; font-weight: 500; color: var(--ink-soft); border-radius: 2px; transition: color .15s ease; }
    .nav-link:hover { color: var(--accent); }
    .nav-active { color: var(--accent); background: var(--accent-soft); }
  `],
})
export class HeaderComponent {
  readonly theme = inject(ThemeService);
  menuOpen = false;
}
