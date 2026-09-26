import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="max-w-[680px] mx-auto px-5 md:px-10 py-10 fade-in">
      <div class="eyebrow mb-2">Account</div>
      <h1 class="display text-[32px] mb-8">Profile</h1>

      @if (auth.user(); as u) {
        <!-- Account card -->
        <div class="card p-6 mb-4 flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center display text-[22px] shrink-0">
            {{ initials(u.name) }}
          </div>
          <div class="min-w-0">
            <div class="font-semibold text-[17px] text-ink truncate">{{ u.name }}</div>
            <div class="caption truncate">{{ u.email }}</div>
            <div class="caption mt-0.5">Member since {{ u.createdAt | date:'MMM d, y' }}</div>
          </div>
        </div>

        <!-- Edit profile -->
        <div class="card p-6 mb-4">
          <h2 class="heading text-[18px] mb-4">Edit profile</h2>
          <form (ngSubmit)="saveProfile()" #pf="ngForm" class="flex flex-col gap-4">
            <label class="block">
              <span class="text-[13px] font-medium text-ink-soft mb-1 block">Name</span>
              <input type="text" name="name" [(ngModel)]="editName" required minlength="2"
                     class="w-full px-3 py-2.5 min-h-[44px] bg-bg border border-rule-strong rounded-[2px] text-ink focus:border-accent" />
            </label>
            <label class="block">
              <span class="text-[13px] font-medium text-ink-soft mb-1 block">Email</span>
              <input type="email" name="email" [(ngModel)]="editEmail" required email
                     class="w-full px-3 py-2.5 min-h-[44px] bg-bg border border-rule-strong rounded-[2px] text-ink focus:border-accent" />
            </label>
            @if (profileMsg(); as m) { <p class="text-[13.5px]" [style.color]="profileOk() ? 'var(--accent)' : 'var(--signal)'">{{ m }}</p> }
            <button class="btn btn-primary self-start" [disabled]="pf.invalid || busy()">{{ busy() ? 'Saving…' : 'Save changes' }}</button>
          </form>
        </div>

        <!-- Change password -->
        <div class="card p-6 mb-4">
          <h2 class="heading text-[18px] mb-4">Change password</h2>
          <form (ngSubmit)="savePassword()" #wf="ngForm" class="flex flex-col gap-4">
            <label class="block">
              <span class="text-[13px] font-medium text-ink-soft mb-1 block">Current password</span>
              <input type="password" name="current" [(ngModel)]="curPw" required autocomplete="current-password"
                     class="w-full px-3 py-2.5 min-h-[44px] bg-bg border border-rule-strong rounded-[2px] text-ink focus:border-accent" />
            </label>
            <label class="block">
              <span class="text-[13px] font-medium text-ink-soft mb-1 block">New password</span>
              <input type="password" name="next" [(ngModel)]="newPw" required minlength="6" autocomplete="new-password"
                     class="w-full px-3 py-2.5 min-h-[44px] bg-bg border border-rule-strong rounded-[2px] text-ink focus:border-accent" />
            </label>
            <label class="block">
              <span class="text-[13px] font-medium text-ink-soft mb-1 block">Confirm new password</span>
              <input type="password" name="confirm" [(ngModel)]="confPw" required autocomplete="new-password"
                     class="w-full px-3 py-2.5 min-h-[44px] bg-bg border border-rule-strong rounded-[2px] text-ink focus:border-accent" />
            </label>
            @if (pwMsg(); as m) { <p class="text-[13.5px]" [style.color]="pwOk() ? 'var(--accent)' : 'var(--signal)'">{{ m }}</p> }
            <button class="btn btn-outline self-start" [disabled]="wf.invalid || busy()">{{ busy() ? 'Updating…' : 'Update password' }}</button>
          </form>
        </div>

        <!-- Your data -->
        <div class="card p-6 mb-4">
          <h2 class="heading text-[18px] mb-2">Your data (local JSON)</h2>
          <p class="body text-[13.5px] mb-4">
            All accounts and progress live in one JSON database stored in this browser.
            Download it as a file, restore it on another device, or inspect it freely — your data is yours.
          </p>
          <div class="flex flex-wrap gap-2">
            <button class="btn btn-outline" (click)="exportDb()">⬇ Export JSON</button>
            <label class="btn btn-outline cursor-pointer">
              ⬆ Import JSON
              <input type="file" accept=".json,application/json" class="hidden" (change)="importDb($event)" />
            </label>
          </div>
          @if (dataMsg(); as m) { <p class="text-[13.5px] mt-3" [style.color]="dataOk() ? 'var(--accent)' : 'var(--signal)'">{{ m }}</p> }
        </div>

        <!-- Danger zone -->
        <div class="card p-6 mb-10" style="border-color:var(--signal)">
          <h2 class="heading text-[18px] mb-2 text-signal">Danger zone</h2>
          <div class="flex flex-wrap gap-2 mt-3">
            <button class="btn btn-outline" (click)="resetProgress()">Reset my progress</button>
            <button class="btn btn-outline text-signal" (click)="deleteAccount()" [style.border-color]="'var(--signal)'" [style.color]="'var(--signal)'">Delete account</button>
          </div>
        </div>
      }
    </div>
  `,
  imports: [CommonModule, FormsModule, RouterLink],
})
export class ProfileComponent {
  readonly auth = inject(AuthService);
  private readonly db = inject(DbService);
  private readonly progress = inject(ProgressService);

  editName = '';
  editEmail = '';
  curPw = '';
  newPw = '';
  confPw = '';

  readonly busy = signal(false);
  readonly profileMsg = signal<string | null>(null);
  readonly profileOk = signal(false);
  readonly pwMsg = signal<string | null>(null);
  readonly pwOk = signal(false);
  readonly dataMsg = signal<string | null>(null);
  readonly dataOk = signal(false);

  constructor() {
    const u = this.auth.user();
    if (u) {
      this.editName = u.name;
      this.editEmail = u.email;
    }
  }

  initials(name: string): string {
    return name.split(/\s+/).map((p) => p[0] ?? '').join('').slice(0, 2).toUpperCase() || '?';
  }

  async saveProfile() {
    const u = this.auth.user();
    if (!u || this.busy()) return;
    this.busy.set(true);
    const r = await this.auth.updateProfile(u.id, this.editName, this.editEmail);
    this.busy.set(false);
    this.profileOk.set(r.ok);
    this.profileMsg.set(r.ok ? 'Profile saved.' : r.error);
  }

  async savePassword() {
    const u = this.auth.user();
    if (!u || this.busy()) return;
    this.busy.set(true);
    const r = await this.auth.changePassword(u.id, this.curPw, this.newPw, this.confPw);
    this.busy.set(false);
    this.pwOk.set(r.ok);
    this.pwMsg.set(r.ok ? 'Password updated.' : r.error);
    if (r.ok) { this.curPw = this.newPw = this.confPw = ''; }
  }

  exportDb(): void {
    const blob = new Blob([this.db.exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculuslearn-data.json';
    a.click();
    URL.revokeObjectURL(url);
    this.dataOk.set(true);
    this.dataMsg.set('Database exported.');
  }

  async importDb(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const text = await file.text();
    const r = this.db.importJson(text);
    this.dataOk.set(r.ok);
    this.dataMsg.set(r.ok ? 'Database imported. You are signed in as before (if that account existed).' : r.error ?? 'Import failed.');
    input.value = '';
  }

  resetProgress(): void {
    if (confirm('Reset ALL your practice progress? This cannot be undone.')) {
      this.progress.resetMyProgress();
      this.dataOk.set(true);
      this.dataMsg.set('Progress reset.');
    }
  }

  deleteAccount(): void {
    if (confirm('Permanently delete your account and all data? This cannot be undone.')) {
      this.auth.deleteAccount();
    }
  }
}
