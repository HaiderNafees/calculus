import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="max-w-[420px] mx-auto px-5 py-16 fade-in">
      <div class="text-center mb-8">
        <div class="eyebrow mb-2">Welcome back</div>
        <h1 class="display text-[32px]">Log in</h1>
      </div>

      <form (ngSubmit)="onSubmit()" class="card p-6 flex flex-col gap-4" #f="ngForm">
        <label class="block">
          <span class="text-[13px] font-medium text-ink-soft mb-1 block">Email</span>
          <input type="email" name="email" [(ngModel)]="email" required email autocomplete="email"
                 placeholder="you@example.com"
                 class="w-full px-3 py-2.5 min-h-[44px] bg-bg border border-rule-strong rounded-[2px] text-ink focus:border-accent" />
        </label>

        <label class="block">
          <span class="text-[13px] font-medium text-ink-soft mb-1 block">Password</span>
          <input type="password" name="password" [(ngModel)]="password" required autocomplete="current-password"
                 placeholder="••••••••"
                 class="w-full px-3 py-2.5 min-h-[44px] bg-bg border border-rule-strong rounded-[2px] text-ink focus:border-accent" />
        </label>

        @if (error(); as msg) {
          <div class="p-3 text-[13.5px] rounded-[2px]" style="background:var(--signal-soft);color:var(--signal);border:1px solid var(--signal)">
            {{ msg }}
          </div>
        }

        <button type="submit" class="btn btn-primary w-full" [disabled]="f.invalid || busy()">
          {{ busy() ? 'Logging in…' : 'Log in' }}
        </button>

        <p class="caption text-center">
          New here?
          <a routerLink="/signup" class="text-accent underline">Create an account</a>
        </p>
      </form>
    </div>
  `,
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);

  async onSubmit() {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set(null);
    const result = await this.auth.login(this.email, this.password);
    this.busy.set(false);
    if (result.ok) {
      await this.router.navigateByUrl('/dashboard');
    } else {
      this.error.set(result.error);
    }
  }
}
