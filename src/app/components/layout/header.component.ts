import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

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
        </a>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1" aria-label="Primary">
          @if (auth.isLoggedIn()) {
            <a routerLink="/dashboard" routerLinkActive="nav-active" class="nav-link">Dashboard</a>
          }
          <a routerLink="/skills" routerLinkActive="nav-active" class="nav-link">Skills</a>
          <a routerLink="/about" routerLinkActive="nav-active" class="nav-link">About</a>
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

          @if (auth.user(); as u) {
            <!-- User menu -->
            <div class="relative">
              <button class="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-accent-soft transition-colors"
                      type="button" (click)="menuOpen = !menuOpen"
                      [attr.aria-expanded]="menuOpen" aria-label="Account menu">
                <span class="w-7 h-7 rounded-full bg-accent text-white dark:text-[#0d1512] flex items-center justify-center text-[12px] font-bold">
                  {{ initials(u.name) }}
                </span>
                <span class="hidden sm:block text-[13px] font-medium text-ink max-w-[120px] truncate">{{ u.name }}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-muted" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
              </button>

              @if (menuOpen) {
                <div class="absolute right-0 top-[calc(100%+6px)] w-52 card p-1.5 shadow-lg fade-slide-in" role="menu">
                  <div class="px-3 py-2 border-b border-rule mb-1">
                    <div class="text-[13.5px] font-semibold text-ink truncate">{{ u.name }}</div>
                    <div class="caption truncate">{{ u.email }}</div>
                  </div>
                  <a routerLink="/profile" (click)="menuOpen = false" class="menu-item" role="menuitem">Profile & settings</a>
                  <a routerLink="/dashboard" (click)="menuOpen = false" class="menu-item" role="menuitem">Dashboard</a>
                  <button type="button" (click)="logout()" class="menu-item w-full text-left text-signal" role="menuitem">Log out</button>
                </div>
              }
            </div>
          } @else {
            <a routerLink="/login" class="btn btn-ghost !min-h-[36px] text-[13px] hidden sm:inline-flex">Log in</a>
            <a routerLink="/signup" class="btn btn-primary !min-h-[36px] text-[13px]">Sign up</a>
          }

          <button class="btn btn-ghost md:hidden !min-h-[36px] !px-2.5" type="button"
                  (click)="mobileOpen = !mobileOpen"
                  [attr.aria-expanded]="mobileOpen"
                  aria-controls="mobile-nav"
                  aria-label="Toggle navigation menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>

      @if (mobileOpen) {
        <nav id="mobile-nav" class="md:hidden border-t border-rule bg-surface px-5 py-3 flex flex-col" aria-label="Mobile">
          @if (auth.isLoggedIn()) {
            <a routerLink="/dashboard" (click)="mobileOpen = false" class="nav-link py-2.5">Dashboard</a>
          }
          <a routerLink="/skills" (click)="mobileOpen = false" class="nav-link py-2.5">Skills</a>
          <a routerLink="/about" (click)="mobileOpen = false" class="nav-link py-2.5">About</a>
          @if (auth.isLoggedIn()) {
            <a routerLink="/profile" (click)="mobileOpen = false" class="nav-link py-2.5">Profile</a>
            <button type="button" (click)="logout()" class="nav-link py-2.5 text-left text-signal">Log out</button>
          } @else {
            <a routerLink="/login" (click)="mobileOpen = false" class="nav-link py-2.5">Log in</a>
          }
        </nav>
      }
    </header>
  `,
  styles: [`
    .nav-link { padding: 8px 14px; font-size: 14px; font-weight: 500; color: var(--ink-soft); border-radius: 2px; transition: color .15s ease; }
    .nav-link:hover { color: var(--accent); }
    .nav-active { color: var(--accent); background: var(--accent-soft); }
    .menu-item { display: block; padding: 8px 12px; font-size: 13.5px; color: var(--ink-soft); border-radius: 2px; }
    .menu-item:hover { background: var(--accent-soft); color: var(--accent); }
  `],
})
export class HeaderComponent {
  readonly theme = inject(ThemeService);
  readonly auth = inject(AuthService);
  menuOpen = false;
  mobileOpen = false;

  initials(name: string): string {
    return name.split(/\s+/).map((p) => p[0] ?? '').join('').slice(0, 2).toUpperCase() || '?';
  }

  logout() {
    this.menuOpen = false;
    this.mobileOpen = false;
    this.auth.logout();
  }
}
