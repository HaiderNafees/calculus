import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="max-w-[720px] mx-auto px-5 md:px-10 py-24 text-center fade-in">
      <div class="mono text-[12px] text-signal mb-4">ERROR 404</div>
      <h1 class="display text-[44px] mb-4">This limit does not exist.</h1>
      <p class="body mb-8">The page you're looking for could not be found — it may have been moved or removed.</p>
      <div class="flex gap-3 justify-center">
        <a routerLink="/" class="btn btn-primary">Go to Dashboard</a>
        <a routerLink="/skills" class="btn btn-outline">Browse Skills</a>
      </div>
    </div>
  `,
})
export class NotFoundComponent {}
