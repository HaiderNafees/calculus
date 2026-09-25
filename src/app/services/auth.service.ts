// ===== AuthService — local accounts backed by DbService =====
// Passwords are never stored in plain text: we store salt + SHA-256(salt+password).
// Everything stays on-device in the local JSON database.

import { Injectable, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DbService, DbUser } from './db.service';

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  lastLoginAt: string;
}

export type AuthResult = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function sha256Hex(text: string): Promise<string> {
  // crypto.subtle requires a secure context (https or localhost).
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const bytes = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback for insecure contexts (e.g. file://) — demo-grade only.
  console.warn('Web Crypto unavailable — using weak fallback hash. Serve over http(s) for real hashing.');
  let h1 = 0x811c9dc5, h2 = 0x1000193;
  for (let i = 0; i < text.length; i++) {
    h1 = (h1 ^ text.charCodeAt(i)) >>> 0; h1 = (h1 * 16777619) >>> 0;
    h2 = (h2 + text.charCodeAt(i) * (i + 7)) >>> 0;
  }
  return (h1.toString(16) + h2.toString(16)).padStart(16, '0');
}

function randomSalt(): string {
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) crypto.getRandomValues(bytes);
  else for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly db = inject(DbService);
  private readonly router = inject(Router);

  /** Reactive current user (derived from the DB document; null when logged out). */
  readonly user = computed<PublicUser | null>(() => {
    const session = this.db.doc().session;
    if (!session) return null;
    const u = this.db.findUserById(session.userId);
    return u ? this.toPublic(u) : null;
  });

  readonly isLoggedIn = computed(() => this.user() !== null);

  // ---------- signup ----------
  async signup(name: string, email: string, password: string, confirm: string): Promise<AuthResult> {
    const n = name.trim();
    const e = email.trim().toLowerCase();

    if (n.length < 2) return { ok: false, error: 'Please enter your name (at least 2 characters).' };
    if (!EMAIL_RE.test(e)) return { ok: false, error: 'Please enter a valid email address.' };
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
    if (password !== confirm) return { ok: false, error: 'Passwords do not match.' };
    if (this.db.findUserByEmail(e)) return { ok: false, error: 'An account with this email already exists. Try logging in.' };

    const salt = randomSalt();
    const passwordHash = await sha256Hex(salt + password);
    const user = this.db.addUser(n, e, salt, passwordHash);
    this.db.setSession(user.id);
    return { ok: true };
  }

  // ---------- login ----------
  async login(email: string, password: string): Promise<AuthResult> {
    const e = email.trim().toLowerCase();
    if (!e || !password) return { ok: false, error: 'Please fill in both fields.' };

    const user = this.db.findUserByEmail(e);
    if (!user) return { ok: false, error: 'No account found with this email.' };

    const hash = await sha256Hex(user.salt + password);
    if (hash !== user.passwordHash) return { ok: false, error: 'Incorrect password. Please try again.' };

    this.db.updateUser(user.id, { lastLoginAt: new Date().toISOString() });
    this.db.setSession(user.id);
    return { ok: true };
  }

  // ---------- session ----------
  logout(): void {
    this.db.setSession(null);
    this.router.navigateByUrl('/');
  }

  // ---------- account management (Profile page) ----------
  async updateProfile(userId: string, name: string, email: string): Promise<AuthResult> {
    const n = name.trim();
    const e = email.trim().toLowerCase();
    if (n.length < 2) return { ok: false, error: 'Name must be at least 2 characters.' };
    if (!EMAIL_RE.test(e)) return { ok: false, error: 'Please enter a valid email address.' };

    const existing = this.db.findUserByEmail(e);
    if (existing && existing.id !== userId) return { ok: false, error: 'That email is already used by another account.' };

    this.db.updateUser(userId, { name: n, email: e });
    return { ok: true };
  }

  async changePassword(userId: string, current: string, next: string, confirm: string): Promise<AuthResult> {
    const user = this.db.findUserById(userId);
    if (!user) return { ok: false, error: 'Not logged in.' };
    if (next.length < 6) return { ok: false, error: 'New password must be at least 6 characters.' };
    if (next !== confirm) return { ok: false, error: 'New passwords do not match.' };

    const currentHash = await sha256Hex(user.salt + current);
    if (currentHash !== user.passwordHash) return { ok: false, error: 'Current password is incorrect.' };

    const salt = randomSalt();
    const passwordHash = await sha256Hex(salt + next);
    this.db.updateUser(userId, { salt, passwordHash });
    return { ok: true };
  }

  deleteAccount(): void {
    const u = this.user();
    if (!u) return;
    this.db.deleteUser(u.id);
    this.router.navigateByUrl('/');
  }

  private toPublic(u: DbUser): PublicUser {
    return { id: u.id, name: u.name, email: u.email, createdAt: u.createdAt, lastLoginAt: u.lastLoginAt };
  }
}
