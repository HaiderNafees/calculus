import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
        <app-sidebar />
        <main class="flex-1 min-w-0">
          <router-outlet />
        </main>
      </div>
      <app-footer />
    </div>
  `,
})
export class AppComponent {}
