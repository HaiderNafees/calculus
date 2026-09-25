import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { HeaderComponent } from './components/layout/header.component';
import { SidebarComponent } from './components/layout/sidebar.component';
import { FooterComponent } from './components/layout/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-bg">
      <app-header />
      <div class="flex flex-1">
        @if (showSidebar()) {
          <app-sidebar />
        }
        <main class="flex-1 min-w-0">
          <router-outlet />
        </main>
      </div>
      <app-footer />
    </div>
  `,
})
export class AppComponent {
  private readonly router = inject(Router);

  /** Sidebar only makes sense on curriculum pages. */
  readonly showSidebar = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map((e) => e.urlAfterRedirects)
      )
      .subscribe((url) => {
        const path = url.split('?')[0];
        const publicPaths = ['/', '/login', '/signup', '/about', '/profile'];
        const isPublic = publicPaths.includes(path) || path.startsWith('/lesson/');
        this.showSidebar.set(!isPublic);
      });
  }
}
