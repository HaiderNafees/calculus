import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="max-w-[420px] mx-auto px-5 py-16 fade-in">
      <div class="text-center mb-8">
        <div class="eyebrow mb-2">Start your journey</div>
        <h1 class="display text-[32px]">Create your account</h1>
        <p class="caption mt-2">Free forever. Your progress stays on your device in a local JSON database.</p>
      </div>

      <form (ngSubmit)="onSubmit()" class="card p-6 flex flex-col gap-4" #f="ngForm">
        <label class="block">
          <span class="text-[13px] font-medium text-ink-soft mb-1 block">Name</span>
          <input type="text" name="name" [(ngModel)]="name" required minlength="2" autocomplete="name"
                 placeholder="Ada Lovelace"
                 class="w-full px-3 py-2.5 min-h-[44px] bg-bg border border-rule-strong rounded-[2px] text-ink focus:border-accent" />
        </label>

        <label class="block">
          <span class="text-[13px] font-medium text-ink-soft mb-1 block">Email</span>
          <input type="email" name="email" [(ngModel)]="email" required email autocomplete="email"
                 placeholder="you@example.com"
                 class="w-full px-3 py-2.5 min-h-[44px] bg-bg border border-rule-strong rounded-[2px] text-ink focus:border-accent" />
        </label>

        <label class="block">
          <span class="text-[13px] font-medium text-ink-soft mb-1 block">Password</span>
          <input type="password" name="password" [(ngModel)]="password" required minlength="6" autocomplete="new-password"
                 placeholder="At least 6 characters"
                 class="w-full px-3 py-2.5 min-h-[44px] bg-bg border border-rule-strong rounded-[2px] text-ink focus:border-accent" />
        </label>

        <label class="block">
          <span class="text-[13px] font-medium text-ink-soft mb-1 block">Confirm password</span>
          <input type="password" name="confirm" [(ngModel)]="confirm" required autocomplete="new-password"
                 placeholder="Repeat password"
                 class="w-full px-3 py-2.5 min-h-[44px] bg-bg border border-rule-strong rounded-[2px] text-ink focus:border-accent" />
        </label>

        @if (error(); as msg) {
          <div class="p-3 text-[13.5px] rounded-[2px]" style="background:var(--signal-soft);color:var(--signal);border:1px solid var(--signal)">
            {{ msg }}
          </div>
        }

        <button type="submit" class="btn btn-primary w-full" [disabled]="f.invalid || busy()">
          {{ busy() ? 'Creating account…' : 'Create account' }}
        </button>

        <p class="caption text-center">
          Already have an account?
          <a routerLink="/login" class="text-accent underline">Log in</a>
        </p>
      </form>
    </div>
  `,
})
export class SignupComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  name = '';
  email = '';
  password = '';
  confirm = '';
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);

  async onSubmit() {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set(null);
    const result = await this.auth.signup(this.name, this.email, this.password, this.confirm);
    this.busy.set(false);
    if (result.ok) {
      await this.router.navigateByUrl('/dashboard');
    } else {
      this.error.set(result.error);
    }
  }
}
